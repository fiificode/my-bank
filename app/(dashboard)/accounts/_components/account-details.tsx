"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { icons } from "./types/icons";
import { Wallet } from "./types/transaction";

interface TransactionDetailProps {
  transaction: Wallet;
  onClose: () => void;
}

export function TransactionDetail({
  transaction,
  onClose,
}: TransactionDetailProps) {
  const Icon = icons[transaction.icon as keyof typeof icons];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 flex items-center justify-center p-4"
    >
      <motion.div
        layoutId={`transaction-${transaction.id}`}
        className="w-full max-w-md bg-white rounded-3xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center space-x-4 mb-8">
          <motion.div
            layoutId={`icon-${transaction.id}`}
            className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center"
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          <>
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
          </>
          <motion.p
            layoutId={`amount-${transaction.id}`}
            className="text-gray-900 font-medium ml-auto"
          >
            {transaction.amount !== undefined
              ? `-$${transaction.amount.toFixed(2)}`
              : "-$0.00"}
          </motion.p>
        </div>

        <div className="space-y-6">
          <div className="pt-6 border-t border-gray-100">
            <p className="text-gray-500 mb-1">#{transaction.id}</p>
            <p className="text-gray-500">{transaction.date}</p>
            <p className="text-gray-500">{transaction.time}</p>
          </div>

          {transaction.paymentMethod && (
            <div className="pt-6 border-t border-gray-100">
              <p className="text-gray-500">
                Paid via {transaction.paymentMethod}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-gray-500">{transaction.cardNumber}</p>
                <img src="/visa.svg" alt="Visa" className="h-4" />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
