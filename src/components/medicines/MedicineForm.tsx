
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios"
import useStore from "@/Store/Store";

const categories = [
  "Pain Killer",
  "Antibiotics",
  "Allergies", 
  "Digestive Health",
  "Fever",
  "Cold and Flu",
  "Vitamins",
  "First Aid",
  "Skin Care",
  "Eye Care",
  "Diabetes",
  "Heart Health",
];

const   MedicineForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setMedicine , medicine} = useStore()

  console.log("this is the medicine", medicine)
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    batchNumber: "",
    expiryDate: "",
    manufacturer: "",
    price: "",
    stock: "",
    category: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };
  
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${import.meta.env.VITE_PUBLIC_API_URL
      }/create-medicine`, {
        name: formData.name,
        description: formData.description,
        batchNumber: formData.batchNumber,
        expiryDate: formData.expiryDate,
        menufacturer: formData.manufacturer,
        price: formData.price,
        stock: formData.stock,
        category: formData.category
      })
      const data = result.data;
      setMedicine(data);
    
    toast({
      title: "Medicine Added",
      description: "The medicine has been successfully added to inventory.",
    });
    
    // Navigate back to medicines list
    navigate("/medicines");

    }catch(err) {
      console.log("something went wrong here !", err);

    }
    
    
  };
  
  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Medicine Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="batchNumber">Batch Number *</Label>
            <Input
              id="batchNumber"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date *</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price (Rs) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/medicines")}
          >
            Cancel
          </Button>
          <Button type="submit">Save Medicine</Button>
        </div>
      </form>
    </Card>
  );
};

export default MedicineForm;
