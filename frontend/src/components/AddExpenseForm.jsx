import { useEffect, useRef, useState } from "react";
import Input from "./Input.jsx";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ onAddExpense, categories }) => {
    const [expense, setExpense] = useState({
        name: "",
        amount: "",
        date: "",
        categoryId: "",
    });
    const [loading, setLoading] = useState(false);

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const handleChange = (key, value) => {
        setExpense({ ...expense, [key]: value });
    };

    const handleAddExpense = async () => {
        setLoading(true);
        try {
            await onAddExpense(expense);
        } finally {
            setLoading(false);
        }
    };

    const hasSetDefaultCategory = useRef(false);

    useEffect(() => {
        if (
            !hasSetDefaultCategory.current &&
            categories.length > 0 &&
            !expense.categoryId
        ) {
            hasSetDefaultCategory.current = true;
            setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories, expense.categoryId]);

    return (
        <div>
            <Input
                value={expense.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Expense Source"
                placeholder="e.g., Groceries, Rent, Travel"
                type="text"
            />

            <Input
                label="Category"
                value={expense.categoryId}
                onChange={({ target }) => handleChange("categoryId", target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="e.g., 1000"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleAddExpense}
                    disabled={loading}
                    className="add-btn add-btn-fill"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            Adding...
                        </>
                    ) : (
                        <>Add Expense</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;