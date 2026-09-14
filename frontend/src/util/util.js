import moment from "moment";

export const addThousandSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const numStr = num.toString();
    const parts = numStr.split(".");

    let integerPart = parts[0];
    let fractionalPart = parts[1];

    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);

    if (otherNumbers !== "") {
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        integerPart = formattedOtherNumbers + "," + lastThree;
    } else {
        integerPart = lastThree;
    }

    const formattedNumber = fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;

    return `₹${formattedNumber}`;
};

export const prepareIncomeLineChartData = (transactions = []) => {
    const groupedByDate = {};

    transactions.forEach((transaction) => {
        const dateKey = moment(transaction.date).format("YYYY-MM-DD");

        if (!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = {
                totalAmount: 0,
                items: [],
            };
        }

        groupedByDate[dateKey].totalAmount += Number(transaction.amount) || 0;
        groupedByDate[dateKey].items.push(transaction);
    });

    return Object.keys(groupedByDate)
        .sort((a, b) => new Date(a) - new Date(b))
        .map((date) => ({
            date,
            totalAmount: groupedByDate[date].totalAmount,
            items: groupedByDate[date].items,
            month: moment(date).format("Do MMM"),
        }));
};

export const prepareExpenseLineChartData = (transactions = []) => {
    const groupedByDate = {};

    transactions.forEach((transaction) => {
        const dateKey = moment(transaction.date).format("YYYY-MM-DD");

        if (!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = {
                totalAmount: 0,
                items: [],
            };
        }

        groupedByDate[dateKey].totalAmount += Number(transaction.amount) || 0;
        groupedByDate[dateKey].items.push(transaction);
    });

    return Object.keys(groupedByDate)
        .sort((a, b) => new Date(a) - new Date(b))
        .map((date) => ({
            date,
            totalAmount: groupedByDate[date].totalAmount,
            items: groupedByDate[date].items,
            month: moment(date).format("Do MMM"),
        }));
};