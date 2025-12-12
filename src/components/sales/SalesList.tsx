import { useEffect, useState } from "react";
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
import {
  PlusCircle,
  Search,
  MoreVertical,
  FileText,
  Printer,
  Eye,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import useStore from "@/Store/Store";
import { useToast } from "@/components/ui/use-toast";

const SalesList = () => {

  const { toast } = useToast();

  const {loading, AllSales, getAllSales} = useStore();
  const [searchTerm, setSearchTerm] = useState("");


  console.log("this is the sale", AllSales)


  // Filter sales based on search term
  const filteredSales = AllSales.filter(
    (sale) =>
      sale.invoice?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      sale.customer?.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  

  useEffect(() => {
    getAllSales();
  }, []);

  const handleStatusChange = async(id:any, status:any) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_PUBLIC_API_URL}/updateStatus/${id}`,
        {paymentStatus: status}
      )
      
      if(response.status === 200) {
        toast({
          title: "status added",
          description: "Status modified successfully !"
        })

      } 

    }catch(err) {
      console.log("somethig went wrong here ", err);
      toast({
        title: "status not added",
        description: "Something went wrong!",
        
      })


    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to="/sales/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Sale
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <div className="relative overflow-auto table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.length > 0 ? (
                filteredSales.map((sale) => (
                  <TableRow key={sale._id}>
                    <TableCell className="font-medium">
                      {sale.invoice}
                    </TableCell>
                    <TableCell>{sale.customer.name}</TableCell>
                    <TableCell>{sale.createdAt}</TableCell>
                    <TableCell>{sale.items.length}</TableCell>
                    <TableCell>Rs {sale.total}</TableCell>
                    <TableCell>
                      <select
                        value={sale.paymentStatus}
                        onChange={(e) =>
                          handleStatusChange(sale._id, e.target.value)
                        } // Optional API update
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium outline-none
      ${
        sale.paymentStatus === "paid"
          ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
          : sale.paymentStatus === "pending"
          ? "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20"
          : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
      }`}
                      >
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                      </select>
                    </TableCell>
                    {/* <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Export PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No sales found
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

export default SalesList;
