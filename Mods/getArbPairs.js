//this module returns atrbitragable pairs
//Local Modules
const api = require('binance');
const socket = require('socket.io');
const express = require('express');
const cors = require('cors');
const sort = require('fast-sort');
const path = require('path');
const Model = require('../database/models');
const { Op, Sequelize } = require('sequelize');
let app,server,io;

//LOCAL ITEMS
let pairs = [],symValJ={};


//RETURNING ITEMS
let triangle = {
  //pairs:[],//{1:BTC,2:ETH,3:XRP,value:}
  getPairs: async () => {
    const setting = await Model.setting.findOne({
      id: 1,
    });
    return new Promise((res,rej) => {
        const bRest = new api.BinanceRest({
            key: 'TzTpA7CJPv6YtBAvJ6Ckm1ifaW30qSD0VbWB84kiAZoBmMRuSrSHcrBVn3VlfDwx', // Get this from your account on binance.com
            secret: 'WbHdmbBkxRwHkkVOIedOzKWjDgBcC3djSH0NPSfBlaKNU9XhgmzSCqWPi2wQgkKl', // Same for this
            timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
            recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
            disableBeautification: false,
            handleDrift: true
        });
        bRest.exchangeInfo()
        .then((r1) => {
          let symbols=[],validPairs=[];
          r1.symbols.forEach(d => {
            if(symbols.indexOf(d.baseAsset) === -1){symbols.push(d.baseAsset);}
            if(symbols.indexOf(d.quoteAsset) === -1){symbols.push(d.quoteAsset);}
            if(d.status === "TRADING"){validPairs.push(d.symbol);symValJ[d.symbol]={bidPrice:0,askPrice:0}}
          });

          //find arbitragable coins
          let s1 = symbols,s2=symbols,s3=symbols;
          //let s1 = [],s2=[],s3=[];
          s1.filter(f1 => f1 === setting.base_coin).forEach(d1 => {
            s2.forEach(d2 => {
              s3.forEach(d3 => {
                if(!(d1 == d2 || d2 == d3 || d3 == d1)){
                  let lv1=[],lv2=[],lv3=[],l1='',l2='',l3='';
                  if(validPairs.indexOf(d1+d2) != -1){
                    lv1.push(d1+d2);
                    l1='num';
                  }
                  if(validPairs.indexOf(d2+d1) != -1){
                    lv1.push(d2+d1);
                    l1='den';
                  }

                  if(validPairs.indexOf(d2+d3) != -1){
                    lv2.push(d2+d3);
                    l2 = 'num';
                  }
                  if(validPairs.indexOf(d3+d2) != -1){
                    lv2.push(d3+d2);
                    l2 = 'den';
                  }

                  if(validPairs.indexOf(d3+d1) != -1){
                    lv3.push(d3+d1);
                    l3='num';
                  }
                  if(validPairs.indexOf(d1+d3) != -1){
                    lv3.push(d1+d3);
                    l3='den';
                  }


                  if(lv1.length && lv2.length && lv3.length){
                    pairs.push({
                      l1:l1,
                      l2:l2,
                      l3:l3,
                      d1:d1,
                      d2:d2,
                      d3:d3,
                      lv1:lv1[0],
                      lv2:lv2[0],
                      lv3:lv3[0],
                      value:-100,
                      tpath:''
                    });
                  }

                }
              });
            });
          });
          //console.log(pairs.length + ',' + symbols.length + ',' + validPairs.length );
          res();

        }).catch(err => {
          console.log(err);
        });
    })
  },
  startServer : () => {
    return new Promise((res,rej) => {
      app = express();
      server = app.listen(3000,() => {console.log('Arbitrage Bot has just started on port 3000. Please wait.....');});
      app.use(cors());
      app.use('/JS',express.static(path.join(__dirname,'../Pages/JS')))
      let renderPage = (req,res) => {
        res.sendFile(path.join(__dirname,"../Pages/index.html"));
      };
      app.get('/',renderPage);
      io = socket(server);
      res();
    });
  },
  calculate: async () => {
    console.log('Finished SetUp. Open "http://127.0.0.1:3000/" in your browser to access. Happy Trading!!');
    const fee_percentage = 0.1 * 0.01;
    const setting = await Model.setting.findOne({
      id: 1,
    });
    let binanceWS = new api.BinanceWS();
    binanceWS.onAllTickers((data) => {
      //Update JSON
      data.forEach(d => {
        symValJ[d.symbol].bidPrice = parseFloat(d.bestBid);
        symValJ[d.symbol].askPrice = parseFloat(d.bestAskPrice);
      });
      //Perform calculation and send alerts
      pairs.filter(d => d.d1 === setting.base_coin).forEach(d => {
        let fee1, fee2, fee3;
        let amount = setting.init_amount;
        //continue if price is not updated for any symbol
        if(symValJ[d.lv1]["bidPrice"] && symValJ[d.lv2]["bidPrice"] && symValJ[d.lv3]["bidPrice"]){
            //Level 1 calculation
            let lv_calc,lv_str;
            if(d.l1 === 'num'){
              lv_calc = symValJ[d.lv1]["bidPrice"];
              lv_str = d.d1 +  '->' + d.lv1 + "['bidP']['" + symValJ[d.lv1]["bidPrice"] + "']" + '->' + d.d2 + '<br/>';
              fee1 = amount * symValJ[d.lv1]["bidPrice"] * fee_percentage;
              amount = (amount * symValJ[d.lv1]["bidPrice"]) - fee1;
              fee1 = fee1 * (1/symValJ[d.lv1]["askPrice"]);
            }
            else{
              lv_calc = 1/symValJ[d.lv1]["askPrice"];
              lv_str = d.d1 +  '->' + d.lv1 + "['askP']['" + symValJ[d.lv1]["askPrice"] + "']" + '->' + d.d2 + '<br/>';
              fee1 = amount * (1/symValJ[d.lv1]["askPrice"]) * fee_percentage;
              amount = (amount * (1/symValJ[d.lv1]["askPrice"])) - fee1;
              fee1 = fee1 * symValJ[d.lv1]["bidPrice"];
            }

            //Level 2 calculation
            if(d.l2 === 'num'){
                lv_calc *= symValJ[d.lv2]["bidPrice"];
                lv_str  += d.d2 +  '->' + d.lv2 + "['bidP']['" + symValJ[d.lv2]["bidPrice"] + "']" +  '->' + d.d3+ '<br/>';
                fee2 = amount * symValJ[d.lv2]["bidPrice"] * fee_percentage;
                amount = (amount * symValJ[d.lv2]["bidPrice"]) - fee2;
              }
            else{
                lv_calc *= 1/symValJ[d.lv2]["askPrice"];
                lv_str  += d.d2 +  '->' + d.lv2 + "['askP']['" + symValJ[d.lv2]["askPrice"] + "']" +  '->' + d.d3 + '<br/>';
                fee2 = amount * (1/symValJ[d.lv2]["askPrice"]) * fee_percentage;
                amount = (amount * (1/symValJ[d.lv2]["askPrice"])) - fee2;
            }

            //Level 3 calculation
            if(d.l3 === 'num'){
                fee2 = fee2 * symValJ[d.lv3]["bidPrice"];

                lv_calc *= symValJ[d.lv3]["bidPrice"];
                lv_str  += d.d3 +  '->' + d.lv3 + "['bidP']['" + symValJ[d.lv3]["bidPrice"] + "']" + '->' +  d.d1 ;
                fee3 = amount * symValJ[d.lv3]["bidPrice"] * fee_percentage;
                amount = (amount * symValJ[d.lv3]["bidPrice"]) - fee3;
              }
            else{
                fee2 = fee2 * (1/symValJ[d.lv3]["askPrice"]);

                lv_calc *= 1/symValJ[d.lv3]["askPrice"];
                lv_str += d.d3 +  '->' + d.lv3 + "['askP']['" + symValJ[d.lv3]["askPrice"] + "']" + '->' +  d.d1;
                fee3 = amount * (1/symValJ[d.lv3]["askPrice"]) * fee_percentage;
                amount = (amount * (1/symValJ[d.lv3]["askPrice"])) - fee3;
            }
            let total_percentage = (fee1 + fee2 + fee3)*100/setting.init_amount;
            d.fee_percentage = total_percentage;
            // d.amount = amount;
            // lv_str += '<br/>' + total_percentage + '->' + amount + '->' + lv_calc;
            d.value = parseFloat(parseFloat((lv_calc - 1)*100).toFixed(3));
            d.final_value = d.value - d.fee_percentage;
            // lv_str += '->' + d.final_value;
            d.tpath = lv_str;
            if(d.final_value >= setting.profit_percentage) {

            }
        }
      });

      //Send Socket
      io.sockets.emit("ARBITRAGE",sort(pairs.filter(d => d.value > 0)).desc(u => u.value));
    });
  },
  log: () => {
    return pairs.length;
  }
}

//PROCEDURE
//GET ALL SYMBOLS AND IDENTIFY ARBITRAGABLE COINS
//OPEN SOCKET FOR 24 HOURS STATS
//CALCULATE AND SEND THE BEST ARB OPPORTUNITIES EVERY SEC

module.exports = triangle;
