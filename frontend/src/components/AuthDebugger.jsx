import React, { useEffect, useState } from 'react';
import { useSession } from '../lib/auth-client';

export default function AuthDebugger() {
  const { data: session, isPending, error } = useSession();
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    // Test the backend auth endpoint
    fetch('http://localhost:3000/api/test-auth', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      console.log('Backend test result:', data);
      setTestResult(data);
    })
    .catch(err => {
      console.error('Backend test error:', err);
      setTestResult({ error: err.message });
    });
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Auth Debug Info</h3>
      
      <div className="space-y-2">
        <p><strong>Session Status:</strong> {isPending ? 'Loading...' : session ? 'Authenticated' : 'Not authenticated'}</p>
        <p><strong>Session Data:</strong></p>
        <pre className="bg-white p-2 rounded text-xs overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
        
        <p><strong>Backend Test Result:</strong></p>
        <pre className="bg-white p-2 rounded text-xs overflow-auto">
          {JSON.stringify(testResult, null, 2)}
        </pre>
        
        {error && (
          <div className="text-red-600">
            <p><strong>Error:</strong> {error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
