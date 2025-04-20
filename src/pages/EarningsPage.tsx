
import React from 'react';
import AppLayout from '@/components/AppLayout';
import EarningsSummary from '@/components/EarningsSummary';
import RideHistoryList from '@/components/RideHistoryList';

const EarningsPage: React.FC = () => {
  return (
    <AppLayout title="Earnings">
      <div className="space-y-6">
        <EarningsSummary />
        <RideHistoryList />
      </div>
    </AppLayout>
  );
};

export default EarningsPage;
