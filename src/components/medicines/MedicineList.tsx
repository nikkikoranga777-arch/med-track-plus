
import { useEffect, useState } from "react";
import { medicines, Medicine } from "@/utils/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, Search, MoreVertical, Pencil, Trash, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import useStore from "@/Store/Store";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const MedicineList = () => {
  const { toast } = useToast();

  const { AllMedicine, loading, getAllMedicine } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [allMedicines, setallMecines] = useState(AllMedicine);

  

  
  
  // Filter medicines based on search term
  const filteredMedicines = AllMedicine?.result?.filter(medicine => 
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    medicine.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("this is all medicine", filteredMedicines)

  const handleDelete = async(id: any) => {
    try {
      const result = await axios.delete(`${import.meta.env.VITE_PUBLIC_API_URL}/deleteMed/${id}`);
      if(result.status === 200) {
        toast({
          title: "Deleted Success",
          description: "Medicine was deleted successfully !",
        });

      }
    }catch(err) {
      console.log("something went wrong while deleting the med !")

    }

  }

  useEffect(() => {
    getAllMedicine()

  },[])
  
  const isLowStock = (stock: number) => stock < 10;
  const isExpiring = (date: string) => {
    const today = new Date();
    const expiryDate = new Date(date);
    const differenceInDays = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return differenceInDays <= 30;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search medicines..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to="/medicines/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Medicine
          </Button>
        </Link>
      </div>
      
      <div className="rounded-md border">
        <div className="relative overflow-auto table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedicines?.length > 0 ? (
                filteredMedicines.map((medicine) => (
                  <TableRow key={medicine._id}>
                    <TableCell className="font-medium">{medicine.name}</TableCell>
                    <TableCell>{medicine.batch}</TableCell>
                    <TableCell>{medicine.category}</TableCell>
                    <TableCell>Rs.{!isNaN(Number(medicine.price)) ? Number(medicine.price).toFixed(2) : "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{medicine.stock}</span>
                        {isLowStock(medicine.stock) && (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{medicine.expiryDate}</span>
                        {isExpiring(medicine.expiryDate) && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {/* <DropdownMenuItem >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem> */}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => {
                              const confirmDelete = window.confirm("Do you want to delete this?");
                              if (confirmDelete) {
                                handleDelete(medicine._id); 
                              }
                          }}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No medicines found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MedicineList;
