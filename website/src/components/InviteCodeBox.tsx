import React from 'react';
import { Share2, Copy } from 'lucide-react';
import { Button } from './ui/button';

interface InviteCodeBoxProps {
  code: string;
  onShare?: () => void;
}

export function InviteCodeBox({ code, onShare }: InviteCodeBoxProps) {
  const handleCopy = () => {
    // Fallback copy method for environments where clipboard API is blocked
    const textArea = document.createElement('textarea');
    textArea.value = code;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert('Invite code copied to clipboard!');
    } catch (err) {
      alert(`Code: ${code}\n\nPlease copy this code manually.`);
    }
    
    textArea.remove();
  };

  return (
    <div className="space-y-4">
      <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 text-center">
        <p className="text-sm text-gray-600 mb-2">Unique Invite Code</p>
        <p className="text-4xl tracking-wider" style={{ color: '#333333', letterSpacing: '0.2em' }}>
          {code}
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={handleCopy}
          className="flex-1 py-3 px-4 rounded-lg bg-white border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all"
          style={{ color: '#333333' }}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Code
        </Button>
        <Button
          onClick={onShare}
          className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white transition-all"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Code
        </Button>
      </div>
    </div>
  );
}
