'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface Flavor {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export default function FlavorsManagement() {
  const { toast } = useToast();
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFlavor, setEditingFlavor] = useState<Flavor | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', isActive: true });

  useEffect(() => {
    fetchFlavors();
  }, []);

  const fetchFlavors = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/flavors');
      if (response.success && response.data && response.data.flavors) {
        setFlavors(response.data.flavors);
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to load flavors', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = editingFlavor
        ? await api.put(`/flavors/${editingFlavor.id}`, formData)
        : await api.post('/flavors', formData);

      if (response.success) {
        toast({ title: 'Success', description: `Flavor ${editingFlavor ? 'updated' : 'created'} successfully` });
        fetchFlavors();
        setShowModal(false);
        setFormData({ name: '', description: '', isActive: true });
        setEditingFlavor(null);
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to save flavor', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await api.delete(`/flavors/${id}`);
      if (response.success) {
        toast({ title: 'Success', description: 'Flavor deleted successfully' });
        fetchFlavors();
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to delete flavor', variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold text-gray-900">Flavors</h1><p className="text-gray-600 mt-1">Manage product flavors</p></div>
        <button onClick={() => { setFormData({ name: '', description: '', isActive: true }); setEditingFlavor(null); setShowModal(true); }} className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"><Plus className="w-4 h-4" />Add Flavor</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flavors.map((flavor) => (
          <div key={flavor.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-4">
              <div><h3 className="font-semibold text-lg text-gray-900">{flavor.name}</h3>{flavor.description && <p className="text-sm text-gray-500">{flavor.description}</p>}</div>
              <div className="flex gap-2">
                <button onClick={() => { setEditingFlavor(flavor); setFormData({ name: flavor.name, description: flavor.description || '', isActive: flavor.isActive }); setShowModal(true); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(flavor.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${flavor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{flavor.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          ))}
        </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingFlavor ? 'Edit Flavor' : 'Add Flavor'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} /></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="rounded" /><label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label></div>
              <div className="flex gap-2 justify-end"><button type="button" onClick={() => { setShowModal(false); setEditingFlavor(null); }} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button><button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">{editingFlavor ? 'Update' : 'Create'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
