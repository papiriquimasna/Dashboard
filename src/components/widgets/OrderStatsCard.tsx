import React from 'react';
import Card from '../ui/Card';
import ReactECharts from 'echarts-for-react';
import { ArrowDown } from 'lucide-react';

const OrderStatsCard: React.FC = () => {
    const option = {
        grid: { left: 0, right: 10, top: 10, bottom: 20 },
        xAxis: {
            type: 'category',
            data: ['01', '02', '03', '04', '05', '06'],
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#737B8B' }
        },
        yAxis: {
            type: 'value',
            splitLine: { 
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#E2E7E7'
                }
            },
            axisLabel: { show: false }
        },
        series: [
            {
                name: 'Last 6 days',
                type: 'line',
                smooth: true,
                data: [120, 180, 150, 220, 180, 250],
                itemStyle: { color: '#5A6ACF' },
                lineStyle: { width: 3 },
                showSymbol: false,
            },
            {
                name: 'Last Week',
                type: 'line',
                smooth: true,
                data: [150, 120, 200, 160, 210, 190],
                itemStyle: { color: '#D8D9DB' },
                lineStyle: { width: 3 },
                showSymbol: false,
            }
        ],
        tooltip: { trigger: 'axis' }
    };

  return (
    <Card>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-lg font-medium">Order</h2>
          <p className="text-3xl font-medium mt-1">2.568</p>
          <div className="flex items-center text-red-stat text-xs font-bold mt-2">
            <ArrowDown size={14} className="mr-1"/>
            <span>2.1% vs last week</span>
          </div>
        </div>
        <button className="text-primary text-xs font-medium border border-gray-200 rounded-md px-4 py-2 shadow-button bg-light-blue-bg hover:bg-gray-100 transition">View Report</button>
      </div>
      <p className="text-gray-text text-sm mb-4">Sales from 1-6 Dec, 2020</p>
      <div className="h-32">
        <ReactECharts option={option} style={{ height: '100%' }} />
      </div>
      <div className="flex items-center space-x-6 mt-4 text-xs text-dark-text/70">
          <div className="flex items-center"><span className="w-2.5 h-2.5 bg-primary rounded-full mr-2"></span>Last 6 days</div>
          <div className="flex items-center"><span className="w-2.5 h-2.5 bg-gray-border rounded-full mr-2"></span>Last Week</div>
      </div>
    </Card>
  );
};

export default OrderStatsCard;
