import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./card";
import {
  TrendingUp,
  Users,
  BedDouble,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

const AnalyticsView = () => {
  return (
    // أضفنا w-full و overflow-x-hidden لمنع الهزة الجانبية في الموبايل
    <div className="w-full p-4 space-y-6 overflow-x-hidden">
      {/* العناوين الرئيسية */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Hotel Analytics
        </h1>
        <p className="text-slate-500 text-sm">
          Property performance summary for October 2023.
        </p>
      </div>

      {/* صف الكروت - التعديل هنا: grid-cols-1 يضمن إن الكروت تحت بعض في الموبايل */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* كارت إجمالي الإيرادات */}
        <Card className="border-l-4 border-l-emerald-500 shadow-sm w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,500</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +12.5% vs
              last month
            </p>
          </CardContent>
        </Card>

        {/* كارت نسبة الإشغال */}
        <Card className="border-l-4 border-l-cyan-500 shadow-sm w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Avg. Occupancy
            </CardTitle>
            <BedDouble className="w-4 h-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84.2%</div>
            <p className="text-xs text-cyan-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +5.2% vs
              last month
            </p>
          </CardContent>
        </Card>

        {/* كارت الضيوف النشطين */}
        <Card className="border-l-4 border-l-blue-500 shadow-sm w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Active Guests
            </CardTitle>
            <Users className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-rose-500 flex items-center mt-1">
              -2.1% vs last week
            </p>
          </CardContent>
        </Card>

        {/* كارت تنبيهات الصلاحية */}
        <Card className="border-l-4 border-l-amber-500 shadow-sm w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Expiry Alerts
            </CardTitle>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-amber-600 mt-1">
              Items expiring in 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* قسم الرسوم البيانية - responsive أيضاً */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <Card className="min-h-[250px] flex items-center justify-center text-slate-400 border-dashed w-full">
          Revenue Chart (Coming Soon)
        </Card>
        <Card className="min-h-[250px] flex items-center justify-center text-slate-400 border-dashed w-full">
          Occupancy by Room Type (Coming Soon)
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsView;