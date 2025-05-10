import React, { useState } from "react";
import { 
  Calendar, 
  Pencil, 
  ChevronDown, 
  Plus, 
  Search, 
  Trash2, 
  Copy, 
  Send, 
  SlidersHorizontal,
  X
} from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  createdAt: Date;
  placeholderCount: number;
  category: string;
  lastSent?: Date;
}

const EmailsPage: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: "friendly",
      name: "Friendly Reminder",
      createdAt: new Date("2025-02-27"),
      placeholderCount: 3,
      category: "Follow-up",
      lastSent: new Date("2025-04-15")
    },
    {
      id: "professional",
      name: "Professional Introduction",
      createdAt: new Date("2025-02-27"),
      placeholderCount: 3,
      category: "Introduction",
      lastSent: new Date("2025-03-22")
    },
    {
      id: "feedback",
      name: "Feedback Request",
      createdAt: new Date("2025-03-12"),
      placeholderCount: 4,
      category: "Feedback",
    },
    {
      id: "thankyou",
      name: "Thank You Note",
      createdAt: new Date("2025-04-03"),
      placeholderCount: 2,
      category: "Gratitude",
      lastSent: new Date("2025-04-29")
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null);
  
  const categories = [...new Set(templates.map(t => t.category))];
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "" || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    setShowDropdownId(null);
  };
  
  const handleDuplicate = (template: EmailTemplate) => {
    const newTemplate = {
      ...template,
      id: `${template.id}-copy-${Date.now()}`,
      name: `${template.name} (Copy)`,
      createdAt: new Date()
    };
    setTemplates([...templates, newTemplate]);
    setShowDropdownId(null);
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-4xl font-bold text-gray-800">Invite to review</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Create Template</span>
          </button>
        </div>
        <p className="text-gray-600">
          Create and manage email templates, then send them manually or schedule automated
          delivery using the Crotus SDK.
        </p>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Email templates ({filteredTemplates.length})</h2>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search templates..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => setFilterModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
            {categoryFilter && (
              <span className="ml-2 px-2 py-0.5 bg-teal-100 text-teal-800 text-xs rounded-full">
                1
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Filter Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Filter Templates</h3>
              <button onClick={() => setFilterModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full p-2 border border-gray-200 rounded-md"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => {
                  setCategoryFilter("");
                  setFilterModalOpen(false);
                }}
                className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                Clear Filters
              </button>
              <button 
                onClick={() => setFilterModalOpen(false)}
                className="px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
      
      {filteredTemplates.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center border border-gray-200">
          <div className="text-gray-500 mb-4">No templates found matching your criteria</div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 mx-auto">
            <Plus className="h-4 w-4" />
            <span>Create New Template</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-800">{template.name}</h3>
                <div className="relative">
                  <button 
                    onClick={() => {
                      if (showDropdownId === template.id) {
                        setShowDropdownId(null);
                      } else {
                        setShowDropdownId(template.id);
                      }
                    }}
                    className="p-1 text-gray-500 hover:bg-gray-100 rounded-md"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </button>
                  
                  {showDropdownId === template.id && (
                    <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <ul className="py-1">
                        <li>
                          <button 
                            onClick={() => handleDuplicate(template)}
                            className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100"
                          >
                            <Copy className="h-4 w-4" />
                            <span>Duplicate</span>
                          </button>
                        </li>
                        <li>
                          <button 
                            className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100"
                          >
                            <Send className="h-4 w-4" />
                            <span>Send Now</span>
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={() => handleDelete(template.id)}
                            className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 text-xs text-gray-600 px-2 py-1 rounded-md inline-block mb-4">
                {template.category}
              </div>
              
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Created {formatDate(template.createdAt)}</span>
              </div>
              
              {template.lastSent && (
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Send className="h-4 w-4" />
                  <span className="text-sm">Last sent {formatDate(template.lastSent)}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-gray-500 mb-6">
                <svg 
                  className="h-4 w-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                  <path d="M4 9h16" />
                </svg>
                <span className="text-sm">{template.placeholderCount} placeholder{template.placeholderCount !== 1 ? 's' : ''}</span>
              </div>
              
              <div className="space-y-2">
                <button className="flex items-center justify-center gap-2 w-full py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors">
                  <Pencil className="h-4 w-4" />
                  <span>Edit Template</span>
                </button>
              </div>
            </div>
          ))}

          <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-white flex flex-col items-center justify-center text-center">
            <Plus className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Create New Template</h3>
            <p className="text-gray-500 text-sm mb-6">Start from scratch or use one of our templates</p>
            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Create Template</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailsPage;