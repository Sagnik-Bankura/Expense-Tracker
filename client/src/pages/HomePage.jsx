/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { List, LayoutGrid, Edit, Trash2, PlusCircle } from "lucide-react";
import Layout from "../components/Layout/Layout";
import Spinner from "../components/Spinner";
import Analytics from "../components/Analytics";

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransaction, setAllTransaction] = useState([]);
    const [frequency, setFrequency] = useState("7");
    const [selectedDate, setSelectedDate] = useState([]);
    const [type, setType] = useState("all");
    const [viewData, setViewData] = useState('table');
    const [editable, setEditable] = useState(null);
    const [formValues, setFormValues] = useState({ amount: '', type: 'expense', category: 'food', reference: '', description: '', date: '' });

    const fetchAllTransactions = useCallback(async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            const res = await axios.post("/api/v1/transactions/get-transaction", { userid: user._id, frequency, selectedDate, type });
            setAllTransaction(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("Failed to fetch transactions.");
        }
    }, [frequency, selectedDate, type]);

    useEffect(() => { 
        fetchAllTransactions(); 
    }, [fetchAllTransactions]);

    const handleDelete = async (record) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            try {
                setLoading(true);
                await axios.post("/api/v1/transactions/delete-transaction", { transactionId: record._id });
                setLoading(false);
                alert("Transaction Deleted!");
                fetchAllTransactions();
            } catch (error) {
                setLoading(false);
                alert("Unable to delete transaction.");
            }
        }
    };

    const handleFormChange = (e) => { setFormValues({ ...formValues, [e.target.name]: e.target.value }); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValues.amount || !formValues.date || !formValues.category) return alert("Please fill amount, date, and category");
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            if (editable) {
                await axios.post("/api/v1/transactions/edit-transaction", { payload: { ...formValues, userid: user._id }, transactionId: editable._id });
                alert("Transaction Updated Successfully");
            } else {
                await axios.post("/api/v1/transactions/add-transaction", { ...formValues, userid: user._id });
                alert("Transaction Added Successfully");
            }
            setLoading(false);
            setShowModal(false);
            setEditable(null);
            fetchAllTransactions();
        } catch (error) {
            setLoading(false);
            alert("Operation failed. Please try again.");
        }
    };

    const openModal = (record = null) => {
        if (record) {
            setEditable(record);
            setFormValues({
                amount: record.amount, type: record.type, category: record.category, reference: record.reference, description: record.description, date: moment(record.date).format('YYYY-MM-DD'),
            });
        } else {
            setEditable(null);
            setFormValues({ amount: '', type: 'expense', category: 'food', reference: '', description: '', date: moment().format('YYYY-MM-DD') });
        }
        setShowModal(true);
    };

    return (
        <Layout>
            {loading && <Spinner />}
            <div className="filters bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-2">
                    <label className="font-semibold text-sm text-gray-700">Frequency:</label>
                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="border rounded-md p-2 text-sm bg-white/50 border-white/40 focus:outline-none focus:ring-2 focus:ring-white/80">
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                        <option value="365">Last 365 Days</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                {frequency === "custom" && (
                     <div className="flex gap-2">
                        <input type="date" value={selectedDate[0] ? moment(selectedDate[0]).format('YYYY-MM-DD') : ''} onChange={e => setSelectedDate([e.target.value, selectedDate[1]])} className="border rounded-md p-2 text-sm bg-white/50 border-white/40 focus:outline-none focus:ring-2 focus:ring-white/80"/>
                        <input type="date" value={selectedDate[1] ? moment(selectedDate[1]).format('YYYY-MM-DD') : ''} onChange={e => setSelectedDate([selectedDate[0], e.target.value])} className="border rounded-md p-2 text-sm bg-white/50 border-white/40 focus:outline-none focus:ring-2 focus:ring-white/80"/>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <label className="font-semibold text-sm text-gray-700">Type:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded-md p-2 text-sm bg-white/50 border-white/40 focus:outline-none focus:ring-2 focus:ring-white/80">
                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setViewData('table')} className={`p-2 rounded-lg ${viewData === 'table' ? 'bg-gray-700 text-white' : 'bg-white/50 text-gray-600'}`}><List /></button>
                    <button onClick={() => setViewData('analytics')} className={`p-2 rounded-lg ${viewData === 'analytics' ? 'bg-gray-700 text-white' : 'bg-white/50 text-gray-600'}`}><LayoutGrid /></button>
                </div>
                <button onClick={() => openModal()} className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg text-sm shadow-md transform hover:scale-105 transition-all duration-300">
                    <PlusCircle size={18} />
                    Add New
                </button>
            </div>

            <div className="content">
                {viewData === 'table' ? (
                    <div className="overflow-x-auto bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg">
                        <table className="min-w-full">
                            <thead className="bg-white/30">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/20">
                                {allTransaction.map((t, index) => (
                                    <tr key={t._id} className="hover:bg-white/20">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{moment(t.date).format("DD-MM-YYYY")}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${t.type === 'income' ? 'text-green-800' : 'text-red-800'}`}>${t.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-4">
                                            <Edit className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => openModal(t)} />
                                            <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer" onClick={() => handleDelete(t)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <Analytics allTransaction={allTransaction} />}
            </div>

            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-black/60" onClick={() => setShowModal(false)}></div>
                        <div className="w-full max-w-lg bg-gray-100 rounded-lg shadow-2xl z-20 mx-4">
                            <form onSubmit={handleSubmit}>
                                <div className="p-6">
                                    <h3 className="text-xl leading-6 font-bold text-gray-800 mb-6">{editable ? 'Edit Transaction' : 'Add Transaction'}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Amount</label>
                                            <input type="number" name="amount" value={formValues.amount} onChange={handleFormChange} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Type</label>
                                            <select name="type" value={formValues.type} onChange={handleFormChange} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option value="income">Income</option>
                                                <option value="expense">Expense</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Category</label>
                                            <select name="category" value={formValues.category} onChange={handleFormChange} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option value="salary">Salary</option><option value="tip">Tip</option><option value="project">Project</option><option value="food">Food</option><option value="movie">Movie</option><option value="bills">Bills</option><option value="medical">Medical</option><option value="fee">Fee</option><option value="tax">Tax</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Date</label>
                                            <input type="date" name="date" value={formValues.date} onChange={handleFormChange} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Reference</label>
                                            <input type="text" name="reference" value={formValues.reference} onChange={handleFormChange} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea name="description" value={formValues.description} onChange={handleFormChange} className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-200 px-6 py-4 flex justify-end gap-4">
                                    <button type="button" onClick={() => setShowModal(false)} className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none">Cancel</button>
                                    <button type="submit" className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};
export default HomePage;