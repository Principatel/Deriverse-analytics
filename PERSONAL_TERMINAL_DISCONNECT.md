# Personal Terminal Disconnect Wallet Feature

## Overview
Added a prominent disconnect wallet card directly in the Personal Terminal section header for quick and easy wallet disconnection.

## Visual Design

### Location
The disconnect wallet card appears in the Personal Terminal mode header, right below the title and description, similar to how the Address Scan mode has an address input field.

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│  Personal Performance Terminal                              │
│  Quantitative breakdown of your on-chain trading behavior   │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  💚  Connected Wallet          [🚪 DISCONNECT]        │  │
│  │      0x1234...5678                                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Features

### 1. **Wallet Info Display**
- **Icon**: Emerald wallet icon in a rounded square
- **Label**: "CONNECTED WALLET" in small uppercase text
- **Address**: Truncated wallet address (6 chars on each side)
- **Color Scheme**: Emerald green indicating active connection

### 2. **Disconnect Button**
- **Icon**: LogOut icon in red
- **Text**: "DISCONNECT" in uppercase
- **Color**: Red theme indicating logout action
- **Hover Effect**: Lighter red on hover
- **Action**: Immediately disconnects wallet when clicked

### 3. **Visual Styling**
- **Container**: Emerald-tinted background with border
- **Layout**: Flexbox with wallet info on left, button on right
- **Responsive**: Adapts to screen size
- **Consistent**: Matches Deriverse design language

## Code Implementation

### Imports Added
```tsx
import { LogOut } from 'lucide-react';
import { useDisconnect } from '@reown/appkit/react';
import { truncateAddress } from '@/lib/utils/format';
```

### Hook Usage
```tsx
const { disconnect } = useDisconnect();
```

### Component Structure
```tsx
{mode === 'OWN' && isConnected && (
  <div className="flex items-center gap-3 max-w-lg mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
    {/* Wallet Info */}
    <div className="flex items-center gap-3 flex-1">
      <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
        <Wallet className="h-5 w-5 text-emerald-500" />
      </div>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 mb-0.5">
          Connected Wallet
        </p>
        <p className="text-sm font-mono text-white">
          {truncateAddress(address?.toString() || '', 6)}
        </p>
      </div>
    </div>
    
    {/* Disconnect Button */}
    <button
      onClick={() => disconnect()}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all group"
    >
      <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-300" />
      <span className="text-xs font-bold uppercase tracking-widest text-red-400 group-hover:text-red-300">
        Disconnect
      </span>
    </button>
  </div>
)}
```

## User Experience Flow

### When Wallet is Connected
1. User navigates to Personal Terminal mode
2. Sees wallet info card with their address
3. Can click "DISCONNECT" button to logout
4. Dashboard immediately locks and shows connection prompt

### Visual States
- **Visible**: Only when in Personal Terminal mode AND wallet is connected
- **Hidden**: When in other modes or wallet is not connected

## Benefits

### 1. **Accessibility**
✅ Prominent placement in the header
✅ No need to scroll or search for disconnect option
✅ Clear visual indication of connected wallet

### 2. **User Control**
✅ Easy one-click disconnect
✅ Always visible when needed
✅ Matches user mental model (similar to address input in EXPLORE mode)

### 3. **Design Consistency**
✅ Matches the EXPLORE mode's address input styling
✅ Uses consistent color scheme (emerald for active, red for logout)
✅ Follows Deriverse design patterns

### 4. **Multiple Disconnect Options**
Users now have THREE ways to disconnect:
1. **Header Wallet Button** - Dropdown menu with disconnect option
2. **Personal Terminal Card** - Prominent disconnect button (NEW!)
3. **AppKit Modal** - Native wallet modal disconnect

## Comparison with Other Modes

### Protocol Data (GENERAL)
- No wallet-specific UI (shows aggregate data)

### Personal Terminal (OWN)
- ✅ **Wallet info card with disconnect button** (NEW!)
- Shows connected wallet address
- Prominent disconnect option

### Address Scan (EXPLORE)
- Address input field for scanning
- Similar layout and positioning

## Technical Details

### Conditional Rendering
```tsx
{mode === 'OWN' && isConnected && (
  // Wallet info card
)}
```

### Styling Classes
- `bg-emerald-500/5` - Light emerald background
- `border-emerald-500/20` - Emerald border
- `bg-red-500/10` - Light red background for button
- `hover:bg-red-500/20` - Darker red on hover

### Responsive Design
- `max-w-lg` - Limits width on large screens
- `flex` layout - Adapts to content
- `gap-3` - Consistent spacing

## Files Modified

1. **`src/app/page.tsx`**
   - Added LogOut icon import
   - Added useDisconnect hook import
   - Added truncateAddress import
   - Added wallet info card in Personal Terminal header
   - Connected disconnect button to useDisconnect hook

## Testing Checklist

- [x] Card appears only in Personal Terminal mode
- [x] Card appears only when wallet is connected
- [x] Wallet address displays correctly
- [x] Disconnect button works
- [x] Dashboard locks after disconnect
- [x] Styling matches design system
- [x] Hover effects work
- [x] Responsive on all screen sizes

## Future Enhancements

Potential additions:
- [ ] Show wallet balance in the card
- [ ] Add copy address button
- [ ] Show connection time/duration
- [ ] Add wallet network indicator
- [ ] Animate card entrance/exit
