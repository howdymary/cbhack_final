import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";

interface MarketTick {
  price: string;
  time: number;
  product_id: string;
}

interface ChartData {
  time: string;
  price: number;
}

export function CoinbaseFeed() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastTick, setLastTick] = useState<MarketTick | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentHour, setCurrentHour] = useState<string>("");

  useEffect(() => {
    const connectWebSocket = () => {
      try {
        const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

        ws.onopen = () => {
          console.log('WebSocket Connected');
          setIsConnected(true);
          ws.send(JSON.stringify({
            type: 'subscribe',
            product_ids: ['ETH-USD'],
            channels: ['ticker']
          }));
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'ticker') {
            setLastTick(data);

            const date = new Date(data.time);
            const hourKey = date.toLocaleTimeString([], { 
              hour: '2-digit',
              hour12: true
            });

            if (hourKey !== currentHour) {
              setCurrentHour(hourKey);
              setChartData(prev => {
                const newData = [...prev, {
                  time: hourKey,
                  price: parseFloat(data.price)
                }];
                return newData.slice(-24);
              });
            }
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setIsConnected(false);
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected. Reconnecting...');
          setIsConnected(false);
          setTimeout(connectWebSocket, 3000);
        };

        setSocket(ws);

        return () => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.close();
          }
        };
      } catch (error) {
        console.error('Failed to connect WebSocket:', error);
        setIsConnected(false);
        setTimeout(connectWebSocket, 3000);
      }
    };

    connectWebSocket();
  }, [currentHour]);

  const formatPrice = (price: string) => {
    return parseFloat(price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  return (
    <Card className="w-full bg-background/90 backdrop-blur border-primary mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isConnected ? (
            <span className="h-2 w-2 rounded-full bg-green-500" />
          ) : (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
          ETH-USD Live Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lastTick ? (
          <div className="space-y-6">
            <div className="text-2xl font-bold font-mono">
              {formatPrice(lastTick.price)}
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="time"
                    tick={{ fontSize: 12 }}
                    interval="preserveEnd"
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  />
                  <Line 
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}