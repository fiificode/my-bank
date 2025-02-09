import { cn } from "@/lib/utils";
import {
  Calendar,
  type LucideIcon,
  ArrowRight,
  AlertCircle,
  PiggyBank,
  Smartphone,
  LandmarkIcon,
} from "lucide-react";
import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { TransactionList } from "./account-list";
import { Transaction } from "./types/transaction";
import { AnimatePresence } from "framer-motion";
import { TransactionDetail } from "./account-details";
import { transactions } from "./data/transactions";

export interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconStyle: string;
  date?: string;
  time?: string;
  amount?: string;
  status: "savings" | "investment" | "mobileMoney";
  progress?: number;
  account?: Transaction[];
}

// interface Account {
//   id: string;
//   icon: string;
//   title: string;
//   category: string;
//   amount: number;
//   date?: string;
//   time?: string;
//   paymentMethod?: string;
//   cardNumber?: string;
// }

interface List03Props {
  items?: ListItem[];
  className?: string;
}

const iconStyles = {
  savings: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  investment: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  debt: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
};

const statusConfig = {
  savings: {
    icon: PiggyBank,
    class: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  investment: {
    icon: AlertCircle,
    class: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  mobileMoney: {
    icon: Smartphone,
    class: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
};

const ITEMS: ListItem[] = [
  {
    id: "1",
    title: "CalBank",
    subtitle: "Main savings account",
    icon: PiggyBank,
    iconStyle: "savings",
    date: "Target: Dec 2024",
    amount: "$15,000",
    status: "savings",
    progress: 65,
    account: [
      {
        id: "67593",
        icon: "PiggyBank",
        title: "Digi Save",
        category: "Primary Saving",
        amount: 6.99,
        date: "September 26",
        time: "12:01 am",
        paymentMethod: "Credit Card",
        cardNumber: "XXXX 9342",
      },
      {
        id: "67594",
        icon: "Signal",
        title: "Verizon",
        category: "Mobile Recharge",
        amount: 4.05,
      },
    ],
  },
  {
    id: "2",
    title: "StandChart",
    subtitle: "Emergency Funds",
    icon: PiggyBank,
    iconStyle: "savings",
    date: "Target: Jun 2024",
    amount: "$50,000",
    status: "savings",
    progress: 30,
    account: [
      {
        id: "67594",
        icon: "Signal",
        title: "Verizon",
        category: "Mobile Recharge",
        amount: 4.05,
      },
    ],
  },
  {
    id: "3",
    title: "Achieve App",
    subtitle: "Saving for a gadget",
    icon: PiggyBank,
    iconStyle: "debt",
    date: "Target: Mar 2025",
    amount: "$25,000",
    status: "savings",
    progress: 45,
    account: [
      {
        id: "67596",
        icon: "FileText",
        title: "Figma",
        category: "Subscription",
        amount: 15.0,
      },
      {
        id: "67597",
        icon: "Hamburger",
        title: "Big Belly Burger",
        category: "Restaurant",
        amount: 12.05,
      },
    ],
  },
];

export default function AccountCard({ items = ITEMS, className }: List03Props) {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<ListItem | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    React.useState<Transaction | null>(null);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 993px) and (max-width : 1200px)"
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1201px)"
  );

  return (
    <div className={cn("w-full overflow-x-auto scrollbar-none", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full p-1">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col",
              "w-full md:w-[280px] shrink-0",
              "bg-white dark:bg-zinc-900/70",
              "rounded-xl",
              "border border-zinc-100 dark:border-zinc-800",
              "hover:border-zinc-200 dark:hover:border-zinc-700",
              "transition-all duration-200",
              "shadow-md backdrop-blur-xl"
            )}
          >
            <div className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    iconStyles[item.iconStyle as keyof typeof iconStyles]
                  )}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <div
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                    statusConfig[item.status].bg,
                    statusConfig[item.status].class
                  )}
                >
                  {React.createElement(statusConfig[item.status].icon, {
                    className: "w-3.5 h-3.5",
                  })}
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm flex gap-2 items-center font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                  <LandmarkIcon size={16} />
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>

              {typeof item.progress === "number" && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Progress
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {item.amount && (
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {item.amount}
                  </span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    target
                  </span>
                </div>
              )}

              <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                <span>{item.date}</span>
              </div>
            </div>

            <div className="mt-auto border-t border-zinc-100 dark:border-zinc-800">
              {isMediumDevice ||
                isLargeDevice ||
                (isExtraLargeDevice && (
                  <>
                    <Dialog
                      open={open}
                      onOpenChange={(isOpen) => {
                        setOpen(isOpen);
                        if (!isOpen) setSelectedItem(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <button
                          className={cn(
                            "w-full flex items-center justify-center gap-2",
                            "py-2.5 px-3",
                            "text-xs font-medium",
                            "text-zinc-600 dark:text-zinc-400",
                            "hover:text-zinc-900 dark:hover:text-zinc-100",
                            "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                            "transition-colors duration-200"
                          )}
                          onClick={() => setSelectedItem(item)}
                        >
                          View Details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="border-b pb-3 dark:border-white/25">
                            {selectedItem?.title}
                          </DialogTitle>
                          <DialogDescription>
                            <TransactionList
                              transactions={transactions}
                              onSelect={setSelectedTransaction}
                            />
                            <AnimatePresence>
                              {selectedTransaction && (
                                <TransactionDetail
                                  transaction={selectedTransaction}
                                  onClose={() => setSelectedTransaction(null)}
                                />
                              )}
                            </AnimatePresence>
                            {/* <div className="flex flex-col mb-2">
                              <span className="text-sm">Account Number</span>
                              <span className="font-bold">14*****51</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm">Amount</span>
                              <span className="font-bold">{item.amount}</span>
                            </div> */}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </>
                ))}
              {/* {isSmallDevice && (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <button
                      className={cn(
                        "w-full flex items-center justify-center gap-2",
                        "py-2.5 px-3",
                        "text-xs font-medium",
                        "text-zinc-600 dark:text-zinc-400",
                        "hover:text-zinc-900 dark:hover:text-zinc-100",
                        "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                        "transition-colors duration-200"
                      )}
                      onClick={() => setSelectedItem(item)}
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle className="border-b pb-3">
                        {selectedItem?.title}
                      </DrawerTitle>
                      <DrawerDescription>{item.subtitle}</DrawerDescription>
                    </DrawerHeader>
                    <TransactionList
                      transactions={Account}
                      onSelect={setSelectedItem}
                    />
                    <AnimatePresence>
                      {selectedTransaction && (
                        <TransactionDetail
                          transaction={ITEMS}
                          onClose={() => setSelectedTransaction(null)}
                        />
                      )}
                    </AnimatePresence>
                    <div className="px-3 flex flex-col">
                      <span>Account Number</span>
                      <span className="text-sm text-gray-400">14*****51</span>
                    </div>
                    <div className="px-3 flex flex-col">
                      <span className="text-sm text-gray-400">Amount</span>
                      <span>{item.amount}</span>
                    </div>
                    <DrawerFooter className="pt-2">
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
