const data = require('../data/data.json');
const moment = require('moment');

const getPortcallController = async (req, res) => {
    let returnData = [];
    const { PortCalls } = data;

    const portCons = {
        func: 'L',
        nameATD: 'ACTUAL TIME DEPARTURE / SAILED',
        nameATA: 'ACTUAL TIME ARRIVED (EOSV - END OF SEA VOYAGE)',
    };

    PortCalls.forEach((portcall) => {
        portcall.Activities.forEach((port) => {
            returnData.push(port);
        });
    });

    returnData = returnData.filter((portcall) => {
        return (
            portcall.Function === portCons.func &&
            (portcall.Name === portCons.nameATD || portcall.Name === portCons.nameATA)
        );
    });

    const sumData = returnData.reduce((acc, portcall) => {
        if (portcall.Name === portCons.nameATD) {
            acc += moment(portcall.Time).hour();
        } else if (portcall.Name === portCons.nameATA) {
            acc -= moment(portcall.Time).hour();
        }
        return acc;
    }, 0);

    try {
        res.json({
            status: 'success',
            differenceTime: sumData,
            dataPortcall: returnData,
            message: `differenceTime is ${portCons.nameATD} - ${portCons.nameATA} in hour`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getPortcallController };
