import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Receipt, DollarSign, Clock, Home as HomeIcon, Wallet, Users, History, UserCircle } from "lucide-react";

const Home = () => {
  const { signOut, user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Divvit</h1>
          <p className="text-sm font-semibold text-foreground">578 points</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-6">
        {/* Quick Scan Button */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 p-8 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
          <div className="bg-primary-foreground/20 rounded-xl p-4 border-2 border-primary-foreground/30">
            <Plus className="h-12 w-12 text-primary-foreground" />
          </div>
        </Card>

        {/* Manual Scan */}
        <Card className="bg-accent/50 p-4 flex items-center gap-4 cursor-pointer hover:bg-accent/70 transition-colors">
          <div className="bg-background rounded-lg p-3">
            <Receipt className="h-6 w-6 text-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Manual Scan</h3>
            <p className="text-sm text-muted-foreground">For those that just need to split</p>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 space-y-2">
            <div className="flex justify-center">
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">$168</p>
              <p className="text-xs text-muted-foreground">split so far...</p>
            </div>
          </Card>
          
          <Card className="p-4 space-y-2">
            <div className="flex justify-center">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">34</p>
              <p className="text-xs text-muted-foreground">minutes saved</p>
            </div>
          </Card>
        </div>

        {/* Promotions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">Promotions</h2>
            <button className="text-sm text-primary hover:underline">see more</button>
          </div>
          <Card className="p-4 flex items-center gap-4">
            <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-2xl">🐼</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">BOGO 50% OFF</p>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
            <button className="text-sm text-primary hover:underline">see all</button>
          </div>
          <div className="space-y-3">
            <Card className="p-4 flex items-center gap-3">
              <Receipt className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-foreground">Bill Split with Natasha and Henry</p>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <Receipt className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-foreground">Panda Express Gift Card Redeemed</p>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="border-t border-border bg-card px-4 py-3">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-primary">
            <HomeIcon className="h-6 w-6" />
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <Wallet className="h-6 w-6" />
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <Users className="h-6 w-6" />
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <History className="h-6 w-6" />
          </button>
          <button onClick={signOut} className="flex flex-col items-center gap-1 text-muted-foreground">
            <UserCircle className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Home;
