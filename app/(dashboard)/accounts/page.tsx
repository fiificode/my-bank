"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HandCoins, Smartphone, Wallet } from "lucide-react";
import React from "react";
import AccountCard from "./_components/account-card";

const Accounts = () => {
  return (
    <div className="bg-white h-fit w-full dark:bg-[#0F0F12] rounded-xl p-4 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2 ">
        <Wallet className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
        Accounts
      </h2>
      {/* Accounts Tabs */}
      <div className="flex w-full flex-col">
        <Tabs defaultValue="savings" className="w-fit -ml-2">
          <TabsList>
            <TabsTrigger value="savings">
              <div className="flex space-x-2 items-center">
                <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <h1>Savings</h1>
              </div>
            </TabsTrigger>
            <TabsTrigger value="investment">
              <div className="flex space-x-2 items-center">
                <HandCoins className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <h1>Investments</h1>
              </div>
            </TabsTrigger>
            <TabsTrigger value="mobileMoney">
              <div className="flex space-x-2 items-center">
                <Smartphone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <h1>Mobile Money</h1>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="savings" className="w-full">
            <AccountCard className="w-full" />
          </TabsContent>
          <TabsContent value="investment">
            Change your password here.
          </TabsContent>
          <TabsContent value="mobileMoney">
            Make changes to your account here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Accounts;
