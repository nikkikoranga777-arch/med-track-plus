
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ArrowUp, 
  ArrowDown, 
  Package, 
  Users, 
  AlertTriangle, 
  ShoppingCart 
} from "lucide-react";
import { sales, medicines, customers, getLowStockMedicines, getExpiringMedicines } from "@/utils/dummyData";
import { Link } from "react-router-dom";
import useStore from "@/Store/Store";

const Dashboard = () => {
  const { AllMedicine, AllCustomer, AllSales} = useStore()

  console.log("this is the sales", AllSales)
  const totalSales = AllSales.reduce((sum, sale) => sum + sale?.subtotal, 0);
  const totalMedicines = AllMedicine?.result?.length;
  const totalCustomers = AllCustomer.length;
  
  const lowStockCount = getLowStockMedicines()?.length;
  const expiringCount = getExpiringMedicines()?.length;
  const alertsCount = lowStockCount + expiringCount;
  
  const recentSales = sales.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            Download Reports
          </Button>
          <Link to="/sales/new">
            <Button>
              New Sale
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs {totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Medicines
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMedicines}</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">
                {lowStockCount} low stock items
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +12 this month
            </p>
          </CardContent>
        </Card>
        
        <Card className={alertsCount > 0 ? "border-red-200 bg-red-50" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alerts
            </CardTitle>
            <AlertTriangle className={`h-4 w-4 ${alertsCount > 0 ? "text-red-500" : "text-muted-foreground"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertsCount}</div>
            <div className="flex items-center pt-1 gap-1 text-xs">
              <span className="text-muted-foreground">
                {lowStockCount} stock alerts,
              </span>
              <span className="text-muted-foreground">
                {expiringCount} expiring
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Sales</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Recent Sales</h2>
            </div>
            <div className="relative overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-2 text-left font-medium">Invoice</th>
                    <th className="p-2 text-left font-medium">Customer</th>
                    <th className="p-2 text-left font-medium">Date</th>
                    <th className="p-2 text-left font-medium">Amount</th>
                    <th className="p-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {AllSales.map((sale) => (
                    <tr key={sale._id} className="border-t hover:bg-muted/50">
                      <td className="p-2">{sale.invoice}</td>
                      <td className="p-2">{sale?.customer?.name}</td>
                      <td className="p-2">{sale.updatedAt}</td>
                      <td className="p-2">Rs {sale?.subtotal}</td>
                      <td className="p-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          sale.paymentStatus === 'paid' 
                            ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' 
                            : sale.paymentStatus === 'pending' 
                            ? 'bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20'
                            : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                        }`}>
                          {sale.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 text-center">
              <Link to="/sales" className="text-sm text-primary hover:text-primary/80">
                View all sales →
              </Link>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Low Stock Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {getLowStockMedicines()?.length > 0 ? (
                  getLowStockMedicines().map(medicine => (
                    <div key={medicine.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{medicine.name}</p>
                        <p className="text-sm text-muted-foreground">{medicine.category}</p>
                      </div>
                      <div className="text-amber-500 font-medium">
                        {medicine.stock} left
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No low stock items</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Expiring Soon
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {getExpiringMedicines()?.length > 0 ? (
                  getExpiringMedicines().map(medicine => (
                    <div key={medicine._id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{medicine.name}</p>
                        <p className="text-sm text-muted-foreground">Batch: {medicine.batchNumber}</p>
                      </div>
                      <div className="text-red-500 font-medium">
                        Exp: {medicine.expiryDate}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No medicines expiring soon</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
