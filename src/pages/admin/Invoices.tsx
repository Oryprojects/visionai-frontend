import React, { useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { FileText, ExternalLink } from 'lucide-react';

const Invoices: React.FC = () => {
  useEffect(() => {
    // Automatically redirect to external invoice system
    window.open('https://sparkling-stardust-b46625.netlify.app/', '_blank');
  }, []);

  return (
    <AdminLayout title="Invoice Management">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Redirecting to Invoice System...</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
            The invoice management system should have opened in a new tab. If it didn't open automatically, click the button below.
          </p>
          <a
            href="https://sparkling-stardust-b46625.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Open Invoice System
          </a>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Invoices;
