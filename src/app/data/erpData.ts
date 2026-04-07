// ─────────────────────────────────────────────
//  Central ERP Data Store
//  All module data lives here so Accounting
//  can pull live cross-module figures.
// ─────────────────────────────────────────────

export type SourceModule =
  | "Room Management"
  | "Front Desk"
  | "Inventory"
  | "Employee Affairs"
  | "Security"
  | "F&B"
  | "Conference"
  | "General";

export type ERPTransaction = {
  id: string;
  date: string;
  type: "Income" | "Expense";
  category: string;
  sourceModule: SourceModule;
  party: string;           // guest name, supplier, department, etc.
  amount: number;          // positive = income, negative = expense
  method: string;
  status: "Completed" | "Pending" | "Failed";
  linkedRef?: string;      // room ID, employee ID, INV-xxx, etc.
};

// ── MODULE COLORS & ICONS ───────────────────
export const MODULE_META: Record<SourceModule, { color: string; bg: string; dot: string; icon: string }> = {
  "Room Management": { color: "text-cyan-700 dark:text-cyan-400",    bg: "bg-cyan-100 dark:bg-cyan-500/15",      dot: "bg-cyan-500",    icon: "🛏️" },
  "Front Desk":      { color: "text-blue-700 dark:text-blue-400",    bg: "bg-blue-100 dark:bg-blue-500/15",      dot: "bg-blue-500",    icon: "🛎️" },
  "Inventory":       { color: "text-amber-700 dark:text-amber-400",  bg: "bg-amber-100 dark:bg-amber-500/15",    dot: "bg-amber-500",   icon: "📦" },
  "Employee Affairs":{ color: "text-purple-700 dark:text-purple-400",bg: "bg-purple-100 dark:bg-purple-500/15",  dot: "bg-purple-500",  icon: "👨‍💼" },
  "Security":        { color: "text-slate-700 dark:text-slate-300",  bg: "bg-slate-100 dark:bg-slate-700/50",    dot: "bg-slate-500",   icon: "🔐" },
  "F&B":             { color: "text-emerald-700 dark:text-emerald-400",bg:"bg-emerald-100 dark:bg-emerald-500/15",dot:"bg-emerald-500", icon: "🍽️" },
  "Conference":      { color: "text-indigo-700 dark:text-indigo-400",bg: "bg-indigo-100 dark:bg-indigo-500/15",  dot: "bg-indigo-500",  icon: "📋" },
  "General":         { color: "text-rose-700 dark:text-rose-400",    bg: "bg-rose-100 dark:bg-rose-500/15",      dot: "bg-rose-500",    icon: "⚙️" },
};

// ── ROOM MANAGEMENT DATA ────────────────────
export const sharedRoomsData = [
  { id: 101, floor: 1, type: "Standard",  status: "Available",   guest: null,           checkIn: null,         checkOut: null,         rate: 89,  amenities: ["Wifi","AC","TV"],          rating: null, nights: null },
  { id: 102, floor: 1, type: "Standard",  status: "Occupied",    guest: "Mark Chen",    checkIn: "2026-03-28", checkOut: "2026-04-02", rate: 89,  amenities: ["Wifi","AC","TV"],          rating: 4,    nights: 5 },
  { id: 103, floor: 1, type: "Deluxe",    status: "Cleaning",    guest: null,           checkIn: null,         checkOut: null,         rate: 145, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
  { id: 104, floor: 1, type: "Standard",  status: "Available",   guest: null,           checkIn: null,         checkOut: null,         rate: 89,  amenities: ["Wifi","AC","TV"],          rating: null, nights: null },
  { id: 105, floor: 1, type: "Deluxe",    status: "Occupied",    guest: "Sara Lee",     checkIn: "2026-03-29", checkOut: "2026-04-05", rate: 145, amenities: ["Wifi","AC","TV","Coffee"], rating: 5,    nights: 7 },
  { id: 106, floor: 1, type: "Standard",  status: "Maintenance", guest: null,           checkIn: null,         checkOut: null,         rate: 89,  amenities: ["Wifi","AC","TV"],          rating: null, nights: null },
  { id: 201, floor: 2, type: "Deluxe",    status: "Available",   guest: null,           checkIn: null,         checkOut: null,         rate: 145, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
  { id: 202, floor: 2, type: "Deluxe",    status: "Occupied",    guest: "Tom Harvis",   checkIn: "2026-03-30", checkOut: "2026-04-01", rate: 145, amenities: ["Wifi","AC","TV","Coffee"], rating: 4,    nights: 2 },
  { id: 203, floor: 2, type: "Suite",     status: "Occupied",    guest: "Anna Gold",    checkIn: "2026-03-27", checkOut: "2026-04-04", rate: 299, amenities: ["Wifi","AC","TV","Coffee"], rating: 5,    nights: 8 },
  { id: 204, floor: 2, type: "Deluxe",    status: "Cleaning",    guest: null,           checkIn: null,         checkOut: null,         rate: 145, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
  { id: 205, floor: 2, type: "Suite",     status: "Available",   guest: null,           checkIn: null,         checkOut: null,         rate: 299, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
  { id: 206, floor: 2, type: "Deluxe",    status: "Maintenance", guest: null,           checkIn: null,         checkOut: null,         rate: 145, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
  { id: 301, floor: 3, type: "Suite",     status: "Occupied",    guest: "David Park",   checkIn: "2026-03-25", checkOut: "2026-04-03", rate: 299, amenities: ["Wifi","AC","TV","Coffee"], rating: 4,    nights: 9 },
  { id: 302, floor: 3, type: "Suite",     status: "Available",   guest: null,           checkIn: null,         checkOut: null,         rate: 299, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
  { id: 303, floor: 3, type: "Suite",     status: "Cleaning",    guest: null,           checkIn: null,         checkOut: null,         rate: 299, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
  { id: 304, floor: 3, type: "Suite",     status: "Occupied",    guest: "Lisa Tran",    checkIn: "2026-03-31", checkOut: "2026-04-06", rate: 299, amenities: ["Wifi","AC","TV","Coffee"], rating: 5,    nights: 6 },
  { id: 305, floor: 3, type: "Deluxe",    status: "Available",   guest: null,           checkIn: null,         checkOut: null,         rate: 145, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
  { id: 306, floor: 3, type: "Deluxe",    status: "Occupied",    guest: "Ryan Kim",     checkIn: "2026-03-28", checkOut: "2026-04-02", rate: 145, amenities: ["Wifi","AC","TV","Coffee"], rating: 3,    nights: 5 },
  { id: 401, floor: 4, type: "Penthouse", status: "Occupied",    guest: "James & Emma", checkIn: "2026-03-20", checkOut: "2026-04-05", rate: 850, amenities: ["Wifi","AC","TV","Coffee"], rating: 5,    nights: 16 },
  { id: 402, floor: 4, type: "Penthouse", status: "Available",   guest: null,           checkIn: null,         checkOut: null,         rate: 850, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
  { id: 403, floor: 4, type: "Suite",     status: "Occupied",    guest: "Carla West",   checkIn: "2026-03-29", checkOut: "2026-04-04", rate: 299, amenities: ["Wifi","AC","TV","Coffee"], rating: 4,    nights: 6 },
  { id: 404, floor: 4, type: "Suite",     status: "Cleaning",    guest: null,           checkIn: null,         checkOut: null,         rate: 299, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
  { id: 405, floor: 4, type: "Penthouse", status: "Maintenance", guest: null,           checkIn: null,         checkOut: null,         rate: 850, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
  { id: 406, floor: 4, type: "Suite",     status: "Available",   guest: null,           checkIn: null,         checkOut: null,         rate: 299, amenities: ["Wifi","AC","TV","Coffee"], rating: null, nights: null },
];

// ── EMPLOYEE DATA ────────────────────────────
export const sharedEmployees = [
  { id: "EMP001", name: "Jane Smith",   role: "Admin Manager",    dept: "Management",   shift: "08:00–17:00", status: "On Duty",  rating: 5, salary: 5800, joined: "2021-03-15" },
  { id: "EMP002", name: "Mark Chen",    role: "Front Desk Lead",  dept: "Front Desk",   shift: "07:00–15:00", status: "On Duty",  rating: 4, salary: 3200, joined: "2022-06-01" },
  { id: "EMP003", name: "Sara Lee",     role: "Housekeeper",      dept: "Housekeeping", shift: "06:00–14:00", status: "On Duty",  rating: 5, salary: 2800, joined: "2023-01-10" },
  { id: "EMP004", name: "Tom Harvis",   role: "Chef de Partie",   dept: "F&B",          shift: "09:00–18:00", status: "On Duty",  rating: 4, salary: 3600, joined: "2022-09-20" },
  { id: "EMP005", name: "Anna Gold",    role: "Security Officer", dept: "Security",     shift: "22:00–06:00", status: "Off Duty", rating: 4, salary: 3000, joined: "2023-04-05" },
  { id: "EMP006", name: "David Park",   role: "Maintenance Tech", dept: "Maintenance",  shift: "08:00–17:00", status: "On Leave", rating: 3, salary: 2900, joined: "2022-11-30" },
  { id: "EMP007", name: "Lisa Tran",    role: "F&B Supervisor",   dept: "F&B",          shift: "12:00–21:00", status: "On Duty",  rating: 5, salary: 3400, joined: "2021-08-12" },
  { id: "EMP008", name: "Ryan Kim",     role: "Front Desk Agent", dept: "Front Desk",   shift: "15:00–23:00", status: "On Duty",  rating: 4, salary: 2700, joined: "2023-07-01" },
  { id: "EMP009", name: "Carla West",   role: "Housekeeper",      dept: "Housekeeping", shift: "14:00–22:00", status: "Off Duty", rating: 4, salary: 2800, joined: "2023-02-15" },
  { id: "EMP010", name: "James Liu",    role: "Security Lead",    dept: "Security",     shift: "06:00–14:00", status: "On Duty",  rating: 5, salary: 3300, joined: "2022-03-28" },
  // Extra staff for payroll totals
  { id: "EMP011", name: "Priya Nair",   role: "Housekeeper",      dept: "Housekeeping", shift: "06:00–14:00", status: "On Duty",  rating: 4, salary: 2800, joined: "2023-05-01" },
  { id: "EMP012", name: "Sam Torres",   role: "Front Desk Agent", dept: "Front Desk",   shift: "23:00–07:00", status: "On Duty",  rating: 4, salary: 2700, joined: "2023-09-01" },
  { id: "EMP013", name: "Mei Zhang",    role: "Sous Chef",        dept: "F&B",          shift: "07:00–16:00", status: "On Duty",  rating: 5, salary: 3200, joined: "2022-01-15" },
  { id: "EMP014", name: "Leo Gomez",    role: "Security Officer", dept: "Security",     shift: "14:00–22:00", status: "On Duty",  rating: 4, salary: 2900, joined: "2023-06-20" },
  { id: "EMP015", name: "Hana Kim",     role: "Housekeeper",      dept: "Housekeeping", shift: "14:00–22:00", status: "On Duty",  rating: 4, salary: 2800, joined: "2023-11-01" },
];

// Payroll total derived from employees
export const totalMonthlyPayroll = sharedEmployees.reduce((s, e) => s + e.salary, 0);

// Payroll by department
export const payrollByDept = sharedEmployees.reduce<Record<string, number>>((acc, e) => {
  acc[e.dept] = (acc[e.dept] || 0) + e.salary;
  return acc;
}, {});

// ── INVENTORY DATA ───────────────────────────
export const sharedInventoryItems = [
  { id: "INV001", name: "Shampoo (300ml)",         category: "Toiletries",   stock: 124, minStock: 50,  unit: "pcs",  cost: 2.50,  lastOrder: "2026-03-20", supplier: "CleanPro Co." },
  { id: "INV002", name: "Conditioner (300ml)",      category: "Toiletries",   stock: 98,  minStock: 50,  unit: "pcs",  cost: 2.50,  lastOrder: "2026-03-20", supplier: "CleanPro Co." },
  { id: "INV003", name: "Shower Gel",               category: "Toiletries",   stock: 22,  minStock: 50,  unit: "pcs",  cost: 3.00,  lastOrder: "2026-03-15", supplier: "CleanPro Co." },
  { id: "INV004", name: "White Bath Towels",         category: "Bedding",      stock: 240, minStock: 100, unit: "pcs",  cost: 12.00, lastOrder: "2026-03-01", supplier: "LinenWorld" },
  { id: "INV005", name: "King Size Pillows",         category: "Bedding",      stock: 48,  minStock: 60,  unit: "pcs",  cost: 25.00, lastOrder: "2026-02-15", supplier: "LinenWorld" },
  { id: "INV006", name: "Mineral Water (500ml)",     category: "F&B Supplies", stock: 480, minStock: 200, unit: "btl",  cost: 0.80,  lastOrder: "2026-03-28", supplier: "AquaFresh Ltd" },
  { id: "INV007", name: "Coffee Pods (Arabica)",     category: "F&B Supplies", stock: 86,  minStock: 100, unit: "box",  cost: 18.00, lastOrder: "2026-03-22", supplier: "BaristaPlus" },
  { id: "INV008", name: "Tea Bags (Assorted)",       category: "F&B Supplies", stock: 12,  minStock: 50,  unit: "box",  cost: 9.00,  lastOrder: "2026-03-10", supplier: "BaristaPlus" },
  { id: "INV009", name: "Floor Cleaner (5L)",        category: "Cleaning",     stock: 28,  minStock: 20,  unit: "cans", cost: 14.00, lastOrder: "2026-03-18", supplier: "HygienePro" },
  { id: "INV010", name: "Glass Cleaner Spray",       category: "Cleaning",     stock: 8,   minStock: 20,  unit: "pcs",  cost: 6.50,  lastOrder: "2026-03-05", supplier: "HygienePro" },
  { id: "INV011", name: "Smart TV Remote (42\")",    category: "Electronics",  stock: 32,  minStock: 10,  unit: "pcs",  cost: 45.00, lastOrder: "2026-01-20", supplier: "TechSupply" },
  { id: "INV012", name: "Hair Dryer 2000W",          category: "Electronics",  stock: 18,  minStock: 12,  unit: "pcs",  cost: 38.00, lastOrder: "2026-02-01", supplier: "TechSupply" },
  { id: "INV013", name: "A4 Printing Paper (Ream)",  category: "Office",       stock: 45,  minStock: 20,  unit: "ream", cost: 7.00,  lastOrder: "2026-03-25", supplier: "OfficeHub" },
  { id: "INV014", name: "Ballpoint Pens (Box)",      category: "Office",       stock: 6,   minStock: 10,  unit: "box",  cost: 4.50,  lastOrder: "2026-03-10", supplier: "OfficeHub" },
];

export const sharedInventoryTransactions = [
  { id: "TXN-0421", type: "IN",  item: "White Bath Towels",      qty: 50,  date: "2026-03-28", by: "Mark Chen",   supplier: "LinenWorld",    unitCost: 12.00 },
  { id: "TXN-0420", type: "OUT", item: "Shampoo (300ml)",        qty: 30,  date: "2026-03-28", by: "System",      supplier: "—",             unitCost: 2.50  },
  { id: "TXN-0419", type: "IN",  item: "Mineral Water (500ml)",  qty: 200, date: "2026-03-27", by: "Sara Lee",    supplier: "AquaFresh Ltd", unitCost: 0.80  },
  { id: "TXN-0418", type: "OUT", item: "Coffee Pods (Arabica)",  qty: 12,  date: "2026-03-27", by: "System",      supplier: "—",             unitCost: 18.00 },
  { id: "TXN-0417", type: "IN",  item: "Floor Cleaner (5L)",     qty: 10,  date: "2026-03-26", by: "Mark Chen",   supplier: "HygienePro",    unitCost: 14.00 },
  { id: "TXN-0416", type: "IN",  item: "Shower Gel",             qty: 80,  date: "2026-03-25", by: "Sara Lee",    supplier: "CleanPro Co.",  unitCost: 3.00  },
  { id: "TXN-0415", type: "IN",  item: "Coffee Pods (Arabica)",  qty: 24,  date: "2026-03-22", by: "Mark Chen",   supplier: "BaristaPlus",   unitCost: 18.00 },
  { id: "TXN-0414", type: "IN",  item: "King Size Pillows",      qty: 20,  date: "2026-03-20", by: "Sara Lee",    supplier: "LinenWorld",    unitCost: 25.00 },
];

// ── SECURITY COST DATA ───────────────────────
export const sharedSecurityCosts = [
  { id: "SEC-EXP-001", date: "2026-03-28", item: "CCTV Maintenance Contract",  amount: 1200, supplier: "SecureTech Ltd",  status: "Completed" },
  { id: "SEC-EXP-002", date: "2026-03-15", item: "Access Control System Upd.", amount: 850,  supplier: "LockPro Systems", status: "Completed" },
  { id: "SEC-EXP-003", date: "2026-03-05", item: "CAM-05 Replacement Part",    amount: 320,  supplier: "SecureTech Ltd",  status: "Pending"   },
  { id: "SEC-EXP-004", date: "2026-03-01", item: "Security Badge Printing",    amount: 190,  supplier: "CardPrint Co.",   status: "Completed" },
];

// ── AUTO-GENERATE CROSS-MODULE TRANSACTIONS ──

// Room Management → Income (occupied rooms × rate × nights)
export const roomRevenueTransactions: ERPTransaction[] = sharedRoomsData
  .filter(r => r.status === "Occupied" && r.guest && r.nights)
  .map(r => ({
    id: `RM-${r.id}`,
    date: r.checkIn!,
    type: "Income",
    category: "Room Revenue",
    sourceModule: "Room Management",
    party: r.guest!,
    amount: r.rate * r.nights!,
    method: "Credit Card",
    status: "Completed",
    linkedRef: `Room #${r.id}`,
  }));

// Front Desk → Income (advance deposits, check-in charges)
export const frontDeskTransactions: ERPTransaction[] = [
  { id: "FD-001", date: "2026-03-31", type: "Income", category: "Check-In Deposit",   sourceModule: "Front Desk", party: "Lisa Tran",    amount: 597,  method: "Credit Card",  status: "Completed", linkedRef: "Check-In #FD-0048" },
  { id: "FD-002", date: "2026-03-30", type: "Income", category: "Check-In Deposit",   sourceModule: "Front Desk", party: "Tom Harvis",   amount: 290,  method: "Credit Card",  status: "Completed", linkedRef: "Check-In #FD-0047" },
  { id: "FD-003", date: "2026-03-30", type: "Income", category: "Late Check-Out Fee",  sourceModule: "Front Desk", party: "David Park",   amount: 50,   method: "Cash",         status: "Completed", linkedRef: "Check-Out #FD-0046" },
  { id: "FD-004", date: "2026-03-29", type: "Income", category: "Early Check-In Fee",  sourceModule: "Front Desk", party: "Carla West",   amount: 30,   method: "Credit Card",  status: "Completed", linkedRef: "Check-In #FD-0045" },
  { id: "FD-005", date: "2026-03-28", type: "Income", category: "Check-In Deposit",   sourceModule: "Front Desk", party: "Mark Chen",    amount: 445,  method: "Cash",         status: "Completed", linkedRef: "Check-In #FD-0044" },
  { id: "FD-006", date: "2026-03-28", type: "Income", category: "Check-In Deposit",   sourceModule: "Front Desk", party: "Ryan Kim",     amount: 725,  method: "Credit Card",  status: "Completed", linkedRef: "Check-In #FD-0043" },
  { id: "FD-007", date: "2026-03-27", type: "Income", category: "Check-In Deposit",   sourceModule: "Front Desk", party: "Anna Gold",    amount: 2990, method: "Bank Transfer", status: "Completed", linkedRef: "Check-In #FD-0042" },
];

// Inventory → Expense (only IN transactions = purchases)
export const inventoryExpenseTransactions: ERPTransaction[] = sharedInventoryTransactions
  .filter(t => t.type === "IN")
  .map(t => ({
    id: `INV-${t.id}`,
    date: t.date,
    type: "Expense",
    category: "Inventory Purchase",
    sourceModule: "Inventory",
    party: t.supplier,
    amount: -(t.qty * t.unitCost),
    method: "Bank Transfer",
    status: "Completed" as const,
    linkedRef: t.id,
  }));

// Employee Affairs → Expense (monthly payroll per dept)
export const payrollExpenseTransactions: ERPTransaction[] = Object.entries(payrollByDept).map(
  ([dept, total], i) => ({
    id: `PAY-${String(i + 1).padStart(3, "0")}`,
    date: "2026-03-31",
    type: "Expense",
    category: "Staff Payroll",
    sourceModule: "Employee Affairs",
    party: `${dept} Department`,
    amount: -total,
    method: "Bank Transfer",
    status: "Completed" as const,
    linkedRef: `${dept} — March 2026`,
  })
);

// Security → Expense
export const securityExpenseTransactions: ERPTransaction[] = sharedSecurityCosts.map(s => ({
  id: `SEC-${s.id}`,
  date: s.date,
  type: "Expense",
  category: "Security & CCTV",
  sourceModule: "Security",
  party: s.supplier,
  amount: -s.amount,
  method: "Bank Transfer",
  status: s.status as "Completed" | "Pending",
  linkedRef: s.id,
}));

// F&B → Income (restaurant, minibar, room service)
export const fbRevenueTransactions: ERPTransaction[] = [
  { id: "FB-001", date: "2026-03-31", type: "Income", category: "Restaurant Revenue", sourceModule: "F&B", party: "Restaurant (Lunch Service)", amount: 1840, method: "Mixed",         status: "Completed" },
  { id: "FB-002", date: "2026-03-31", type: "Income", category: "Room Service",       sourceModule: "F&B", party: "Room Service Orders",        amount: 500,  method: "Room Charge",   status: "Completed" },
  { id: "FB-003", date: "2026-03-30", type: "Income", category: "Restaurant Revenue", sourceModule: "F&B", party: "Restaurant (Dinner Service)", amount: 2200, method: "Mixed",         status: "Completed" },
  { id: "FB-004", date: "2026-03-30", type: "Income", category: "Minibar Revenue",    sourceModule: "F&B", party: "Minibar Consumption",        amount: 380,  method: "Room Charge",   status: "Completed" },
  { id: "FB-005", date: "2026-03-29", type: "Income", category: "Restaurant Revenue", sourceModule: "F&B", party: "Restaurant (All Day)",       amount: 3100, method: "Mixed",         status: "Completed" },
  { id: "FB-006", date: "2026-03-28", type: "Income", category: "Bar Revenue",        sourceModule: "F&B", party: "Pool Bar",                   amount: 720,  method: "Cash",          status: "Completed" },
];

// Conference → Income
export const conferenceTransactions: ERPTransaction[] = [
  { id: "CONF-001", date: "2026-03-28", type: "Income", category: "Conference Hall",    sourceModule: "Conference", party: "Corp. Event (TechCo)",   amount: 4800, method: "Bank Transfer", status: "Completed" },
  { id: "CONF-002", date: "2026-03-25", type: "Income", category: "Meeting Room",       sourceModule: "Conference", party: "Startup Summit Ltd.",     amount: 1200, method: "Credit Card",   status: "Completed" },
  { id: "CONF-003", date: "2026-03-20", type: "Income", category: "Conference Hall",    sourceModule: "Conference", party: "Annual Board Meeting",    amount: 6500, method: "Bank Transfer", status: "Completed" },
];

// General → Expense (utilities, marketing, maintenance)
export const generalExpenseTransactions: ERPTransaction[] = [
  { id: "GEN-001", date: "2026-03-29", type: "Expense", category: "Utilities",        sourceModule: "General", party: "City Power & Water",    amount: -5600,  method: "Auto-Debit",    status: "Completed" },
  { id: "GEN-002", date: "2026-03-27", type: "Expense", category: "Marketing",        sourceModule: "General", party: "Digital Agency XYZ",    amount: -2200,  method: "Bank Transfer", status: "Failed"    },
  { id: "GEN-003", date: "2026-03-28", type: "Expense", category: "Maintenance",      sourceModule: "General", party: "Facility Services Co.", amount: -1200,  method: "Cash",          status: "Pending"   },
  { id: "GEN-004", date: "2026-03-25", type: "Expense", category: "Insurance",        sourceModule: "General", party: "HotelShield Insurance", amount: -3800,  method: "Bank Transfer", status: "Completed" },
  { id: "GEN-005", date: "2026-03-22", type: "Expense", category: "Software License", sourceModule: "General", party: "ERP Suite Annual Plan",  amount: -4200,  method: "Credit Card",   status: "Completed" },
];

// ── UNIFIED LEDGER ───────────────────────────
export const allERPTransactions: ERPTransaction[] = [
  ...roomRevenueTransactions,
  ...frontDeskTransactions,
  ...fbRevenueTransactions,
  ...conferenceTransactions,
  ...inventoryExpenseTransactions,
  ...payrollExpenseTransactions,
  ...securityExpenseTransactions,
  ...generalExpenseTransactions,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// ── AGGREGATE HELPERS ────────────────────────
export const totalIncome   = allERPTransactions.filter(t => t.type === "Income").reduce((s, t) => s + t.amount, 0);
export const totalExpenses = allERPTransactions.filter(t => t.type === "Expense").reduce((s, t) => s + Math.abs(t.amount), 0);
export const netProfit     = totalIncome - totalExpenses;

// Revenue by source module
export const revenueByModule = (["Room Management", "Front Desk", "F&B", "Conference"] as SourceModule[]).map(mod => ({
  module: mod,
  total: allERPTransactions.filter(t => t.sourceModule === mod && t.type === "Income").reduce((s, t) => s + t.amount, 0),
  ...MODULE_META[mod],
}));

// Expenses by source module
export const expensesByModule = (["Employee Affairs", "Inventory", "General", "Security"] as SourceModule[]).map(mod => ({
  module: mod,
  total: allERPTransactions.filter(t => t.sourceModule === mod && t.type === "Expense").reduce((s, t) => s + Math.abs(t.amount), 0),
  ...MODULE_META[mod],
}));
