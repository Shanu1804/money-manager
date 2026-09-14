import { Layers2 } from "lucide-react";
import { Pencil } from "lucide-react";
const  CategoryList = ({categories, onEditCategory}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Category Sources</h4>
            </div>

            {/* Category list*/}
            {categories.length === 0 ? (
                <p className="text-gray-500">
                    No categories added yet. Add some to get started!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60">
                            {/* Icon/Emojis display*/}
                            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 rounded-full bg-gray-100">
                                {category.icon ? (
                                    <span className="text-2xl">
                                        <img src={category.icon} alt={category.name} className="w-5 h-5" />
                                    </span>
                                ): (
                                    <Layers2 className="text-purple-800" size={24} />
                                )}
                            </div>

                            {/* Category details*/}
                            <div className="flex flex-1 items-center justify-between">
                                {/* Category name and type*/}
                                <div>
                                    <p className="text-sm text-gray-700 font-medium">
                                        {category.name}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1 capitalize">
                                        {category.type}
                                    </p>
                                </div>
                                {/* Action buttons*/}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEditCategory(category)}
                                        className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Pencil size={18} />
                                    </button>
                                </div>
                            </div>



                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryList;