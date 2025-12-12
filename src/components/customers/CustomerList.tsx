
import { useEffect, useState } from "react";
import { customers, Customer, sales } from "@/utils/dummyData";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  PlusCircle, 
  Search, 
  MoreVertical, 
  UserRoundPlus, 
  UserRoundPen,
  UserRoundMinus,
  MailIcon,
  PhoneIcon,
  HomeIcon,
  ShoppingCart
} from "lucide-react";
import { Link, useNavigate} from "react-router-dom";
import useStore from "@/Store/Store";

const CustomerList = () => {
  const navigate = useNavigate();
  const {getAllCustomer, AllCustomer, loading, AllMedicine } = useStore();
  // console.log("this is the all customer", AllMedicine)
  console.log('AllMedicine', JSON.stringify(AllMedicine, null, 2))
  const [searchTerm, setSearchTerm] = useState("");
  const [allCustomers] = useState<Customer[]>(customers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Filter customers based on search term
  const filteredCustomers = AllCustomer.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getCustomerPurchases = (customerId: string) => {
    return sales.filter(sale => sale.customerId === customerId);
  };


  useEffect(() => {
    getAllCustomer();

  },[])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to="/customers/add">
          <Button onClick={() => navigate("/customers/add")}>
            <UserRoundPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </Link>
      </div>
      
      <div className="rounded-md border">
        <div className="relative overflow-auto table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Purchases</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            {
              loading ? (
                <h2 className="text-sm font-semibold text-center">Loading..</h2>

              ) : (
                <TableBody>
                {filteredCustomers?.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer._id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell> 
                        {customer.purchase}
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
                            <DropdownMenuItem onClick={() => {
                              setSelectedCustomer(customer);
                              setIsDetailsOpen(true);
                            }}>
                              View Details
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>
                              <UserRoundPen className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <UserRoundMinus className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem> */}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No customers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

              )
            }
           
          </Table>
        </div>
      </div>
      
      {/* Customer Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              View customer information and purchase history
            </DialogDescription>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="grid gap-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Card className="flex-grow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HomeIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.address}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="flex-grow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Purchase Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const purchases = getCustomerPurchases(selectedCustomer.id);
                      const totalSpent = purchases.reduce((sum, sale) => sum + sale.total, 0);
                      
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Total purchases:</span>
                            <span className="font-medium">{purchases.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Total spent:</span>
                            <span className="font-medium">${totalSpent.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Last purchase:</span>
                            <span className="font-medium">
                              {purchases.length > 0 
                                ? purchases.sort((a, b) => 
                                  new Date(b.date).getTime() - new Date(a.date).getTime()
                                )[0].date 
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Purchase History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(() => {
                          const purchases = getCustomerPurchases(selectedCustomer.id);
                          
                          return purchases.length > 0 ? (
                            purchases.map(sale => (
                              <TableRow key={sale.id}>
                                <TableCell className="font-medium">{sale.invoiceNumber}</TableCell>
                                <TableCell>{sale.date}</TableCell>
                                <TableCell>{sale.items.length}</TableCell>
                                <TableCell className="text-right">${sale.total.toFixed(2)}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-4">
                                No purchase history
                              </TableCell>
                            </TableRow>
                          );
                        })()}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsOpen(false)}
                >
                  Close
                </Button>
                <Link to={`/sales/new?customer=${selectedCustomer.id}`}>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Sale
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerList;
