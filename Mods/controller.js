const Model = require('../database/models');
const { Op, Sequelize, where } = require('sequelize');

exports.getPauseSetting = async (req, res) => {
    try {
        const setting = await Model.setting.findOne({
            where: {
                id: 1
            }
        });
        return res.json({
            isPaused: setting.is_paused
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
			message: 'error!!!',
		});
    }
};

exports.getSetting = async (req, res) => {
    try {
        const setting = await Model.setting.findOne({
            where: {
                id: 1
            }
        });
        return res.json({
            setting
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
			message: 'error!!!',
		});
    }
};

exports.setPauseSetting = async (req, res) => {
    const { isPaused } = req.body;
    try {
        await Model.setting.update(
            {
                is_paused: isPaused
            },
            {
                where: {
                    id: 1,
                },
            }
        );
        return res.json({
            is_paused: isPaused
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
			message: 'error!!!',
		});
    }
};

exports.setSetting = async (req, res) => {
    const { baseCoin, initAmount, profitPercentage } = req.body;
    try {
        await Model.setting.update(
            {
                base_coin: baseCoin.toUpperCase(),
                init_amount: initAmount,
                profit_percentage: profitPercentage
            },
            {
                where: {
                    id: 1,
                },
            }
        );
        return res.json({
            status: 'ok'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
			message: 'error!!!',
		});
    }
};

exports.getTransactions = async (req, res) => {
    const { filterStartDate, filterEndDate } = req.body;
    try {
        const whereQuery = {};
        // const startDate = new Date(filterStartDate);
        // const endDate = new Date(filterEndDate);
        whereQuery['createdAt'] = {
            [Op.between]: [filterStartDate+'T00:00:00.000Z', filterEndDate+'T23:59:59.000Z'],
        };
        const transactions = await Model.trade_transaction.findAll({
            where: whereQuery,
			order: [['id', 'DESC']]
        });
        return res.json({
            transactions
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
			message: 'error!!!',
		});
    }
};