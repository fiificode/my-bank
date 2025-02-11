import { cn } from "@/lib/utils";
import {
  type LucideIcon,
  ArrowRight,
  PiggyBank,
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
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { TransactionList } from "./account-list";

import { AnimatePresence } from "framer-motion";
import { TransactionDetail } from "./account-details";
import { Wallet } from "./types/transaction";
import { wallets } from "./data/transactions";
import { Button } from "@/components/ui/button";

export interface ListItem {
  id: string;
  AccountName: string;
  icon: LucideIcon;
  iconStyle: string;
  amount?: string;
  category: "savings" | "investment" | "mobileMoney";
  account?: Wallet[];
}

interface List03Props {
  items?: ListItem[];
  className?: string;
}

const iconStyles = {
  savings: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  investment: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  debt: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
};

const ITEMS: ListItem[] = [
  {
    id: "1",
    AccountName: "CalBank",
    icon: PiggyBank,
    iconStyle: "savings",
    amount: "$15,000",
    category: "savings",

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
    AccountName: "StandChart",
    icon: PiggyBank,
    iconStyle: "savings",

    amount: "$50,000",
    category: "savings",

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
    AccountName: "Achieve App",
    icon: PiggyBank,
    iconStyle: "debt",
    amount: "$25,000",
    category: "savings",
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
    React.useState<Wallet | null>(null);
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
      <div className="my-3">
        <Button>Add Account</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full p-1">
        {items.map((item) => {
          return (
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
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      iconStyles[item.iconStyle as keyof typeof iconStyles]
                    )}
                  >
                    <LandmarkIcon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-sm flex gap-2 items-center font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                    {item.AccountName}
                  </h3>
                  <p className="text-xs bg-green-200  w-fit p-1 rounded-lg text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {item.category}
                  </p>
                </div>

                {item.amount && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Total Amount: {item.amount}
                    </span>
                  </div>
                )}
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
                              {selectedItem?.AccountName}
                            </DialogTitle>
                            <DialogDescription>
                              <TransactionList
                                transactions={item.account}
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
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </>
                  ))}
                {isSmallDevice && (
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
                          {selectedItem?.AccountName}
                        </DrawerTitle>
                        <DrawerDescription>{item.category}</DrawerDescription>
                      </DrawerHeader>
                      <TransactionList
                        transactions={item.account}
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

                      <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
