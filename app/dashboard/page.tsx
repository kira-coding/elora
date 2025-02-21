export const dynamic = 'force-dynamic';

import { ChartColumnStacked, HandHelping, LockKeyhole, MailOpen, MessageCircle, SquareChartGantt, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Dashboard() {
  return (
    <>
      <div className="card-title divider">Dashboard</div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-warning">Be responsible, this app was design to be used  with others.</div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div className="card bg-neutral text-neutral-content w-96">
          <div className="card-body items-center text-center">
            <h2 className="card-title"> <LockKeyhole /> Administration!</h2>
            <p className="text-md">Manage your Elora account and other admin accounts.</p>
            
            <div className="card-actions justify-end">
              <Link href="/dashboard/admins/me" className="btn btn-primary"> <User /> My account</Link>
              <Link  href="/dashboard/admins" className="btn btn-ghost"><SquareChartGantt /> Manage Admins</Link>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-96">
          <div className="card-body items-center text-center">
            <h2 className="card-title"><ChartColumnStacked />Categories</h2>
            <p className="text-md">Where you manage discussion categories and volunteers </p>
            <div className="card-actions justify-end">
              <Link href="/dashboard/categories" className="btn btn-primary"><SquareChartGantt />Manage Categories </Link>
              <Link href="/dashboard/volunteers" className="btn btn-ghost"><HandHelping />Elorians</Link>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-96">
          <div className="card-body items-center text-center">
            <h2 className="card-title"><MessageCircle />Comments from users!</h2>
            <p className="text-md">on this page you can see comments and feedbacks from users.</p>
            <div className="card-actions justify-end">
              <Link  href="/dashboard/comments" className="btn btn-primary"><MailOpen />Read comments</Link>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;