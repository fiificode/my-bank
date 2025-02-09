"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { icons } from "./types/icons";
import { Transaction } from "./types/transaction";

interface TransactionListProps {
  transactions: Transaction[] | undefined;
  onSelect: (transaction: Transaction) => void;
}

export function TransactionList({
  transactions,
  onSelect,
}: TransactionListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md mx-auto bg-background p-6"
    >
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Transactions
      </h1>
      <div className="space-y-4">
        {transactions?.map((transaction) => {
          const Icon = icons[transaction?.icon as keyof typeof icons];
          return (
            <motion.div
              key={transaction.id}
              layoutId={`transaction-${transaction.id}`}
              onClick={() => onSelect(transaction)}
              className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  layoutId={`icon-${transaction.id}`}
                  className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <motion.p
                    layoutId={`title-${transaction.id}`}
                    className="font-medium text-gray-900"
                  >
                    {transaction.title}
                  </motion.p>
                  <motion.p
                    layoutId={`category-${transaction.id}`}
                    className="text-sm text-gray-500"
                  >
                    {transaction.category}
                  </motion.p>
                </div>
              </div>
              <motion.p
                layoutId={`amount-${transaction.id}`}
                className="text-gray-900 font-medium"
              >
                -${transaction.amount ? transaction.amount.toFixed(2) : "0.00"}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
