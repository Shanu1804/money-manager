import CustomPieChart from "./CustomPieChart.jsx";
import { addThousandSeparator } from "../util/util.js";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    const COLORS = ["#59168B", "#a0090e", "#016630"]; // Purple, Red, Green

    const balanceData = [
        {
            name: "Total Balance",
            amount: Math.abs(totalBalance),
            originalAmount: totalBalance
        },
        { name: "Total Expense", amount: totalExpense, originalAmount: totalExpense },
        { name: "Total Income", amount: totalIncome, originalAmount: totalIncome },
    ];

    const displayAmount =
        totalBalance < 0
            ? `-${addThousandSeparator(Math.abs(totalBalance))}`
            : `${addThousandSeparator(totalBalance)}`;

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Finance Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={displayAmount}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;