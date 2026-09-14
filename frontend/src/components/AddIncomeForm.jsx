import {useEffect, useRef, useState} from "react";
import Input from "./Input.jsx";
import {LoaderCircle} from "lucide-react";

const AddIncomeForm = ({onAddIncome, categories }) => {
    const [income, setIncome] = useState({
        name: '',
        amount: '',
        date: '',
        categoryId: ''
    })
    const [loading, setLoading] = useState(false);

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }))

    const handleChange = (key, value) => {
        setIncome({...income, [key]: value});
    }

    const handleAddIncome = async () => {
        setLoading(true);
        try {
            await onAddIncome(income);
        }finally {
            setLoading(false);
        }
    }

    const hasSetDefaultCategory = useRef(false);

    useEffect(() => {
        if (
            !hasSetDefaultCategory.current &&
            categories.length > 0 &&
            !income.categoryId
        ) {
            hasSetDefaultCategory.current = true;
            setIncome(prev => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories, income.categoryId]);

    return (
        <div>
            <Input
                value={income.name}
                onChange={({target}) => handleChange('name', target.value)}
                label="Income Source"
                placeholder="e.g., Salary, Freelancing, Bonus."
                type = "text"
            />

            <Input
                label="Category"
                value={income.categoryId}
                onChange={({target}) => handleChange('categoryId', target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={income.amount}
                onChange={({target}) => handleChange('amount', target.value)}
                label="Amount"
                placeholder="e.g., 1000"
                type="number"
            />

            <Input
                value={income.date}
                onChange={({target}) => handleChange('date', target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleAddIncome}
                    disabled={loading}
                    className="add-btn add-btn-fill">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin " />
                            Adding...
                        </>
                    ):(
                        <>
                            Add Income
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm;