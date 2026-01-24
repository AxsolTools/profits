# Proof Application Build Plan - Frontend "Rebuild"

## Goal
Transform the current "marketing site" frontend into a fully functional **Decentralized Escrow Application** that directly interfaces with the backend APIs (`/api/transactions`, `/api/disputes`, `/api/votes`).

## 1. Core Application Pages (New)
We will move beyond the single landing page (`app/page.tsx`) and create dedicated application routes using the existing high-end design system.

### `app/dashboard/page.tsx` (User Hub)
*   **Purpose**: The central command center for Buyers and Sellers.
*   **Features**:
    *   Active Escrows List (fetched from `api/transactions`).
    *   Action Items (e.g., "Confirm Receipt", "Upload Evidence").
    *   Stats Cards (Total Volume, Trust Score - using `components/stats.tsx` styles).
*   **Design**: Uses the Bento grid style from `features.tsx` but with real transaction data.

### `app/create/page.tsx` (New Transaction)
*   **Purpose**: The interface to create a new Escrow contract.
*   **Features**:
    *   Multi-step form (Buyer/Seller/Amount/Conditions).
    *   Integration with `api/transactions`.
    *   Streamflow Widget placeholder (UI ready for SDK).
*   **Design**: High-end form styling (floating labels, validation states) similar to the `VerificationModal` but expanded.

### `app/dispute/[id]/page.tsx` (Resolution Center)
*   **Purpose**: Shared view for dispute resolution and voting.
*   **Features**:
    *   **Evidence Timeline**: Visual feed of uploaded proofs/receipts (`api/evidence`).
    *   **Voting Terminal**: Interface for PROOF holders to cast votes (`api/votes`).
    *   **Status Tracker**: Real-time status from Realms/Streamflow webhooks.
*   **Design**: "Terminal" aesthetic with distinct zones for evidence vs. voting.

## 2. Component Rebuild & Wiring

### `components/transaction-form.tsx` (New)
*   **Function**: Handles the logic for `POST /api/transactions`.
*   **Inputs**: Buyer Wallet, Seller Wallet, Amount, Token type.
*   **Validation**: Uses `zod` schema from `lib/validations`.

### `components/evidence-upload.tsx` (New)
*   **Function**: Drag-and-drop zone for `POST /api/evidence`.
*   **Features**: Progress bars, file type validation, preview.
*   **Design**: Uses the "glassmorphism" style present in the Hero.

### `components/wallet-connect-button.tsx` (New)
*   **Function**: Critical for the "dApp" feel.
*   **Logic**: Manages wallet state (mocked for now until solana-adapter is installed, but UI-ready).
*   **Placement**: Replaces the generic "Docs" links in the Header.

## 3. "De-fluffing" the Landing Page
*   **Action**: The current `page.tsx` is marketing-heavy. We will:
    *   Keep the **Hero** and **Stats** (social proof).
    *   Replace the generic **Features** section with a "Live Activity" preview that links to the **Dashboard**.
    *   Repurpose **VerificationModal** to be the entry point for the `app/create` flow.

## 4. Feature Mapping (OverHual.md -> Components)

| OverHual.md Feature | Backend API | New Frontend Component |
|---------------------|-------------|------------------------|
| **Escrow Creation** | `POST /transactions` | `app/create/page.tsx` |
| **Evidence Upload** | `POST /evidence` | `components/evidence-upload.tsx` |
| **Dispute Voting** | `POST /votes` | `app/dispute/[id]/page.tsx` |
| **User History** | `GET /transactions` | `app/dashboard/page.tsx` |

## 5. Execution Steps
1.  **Create App Layout**: Set up the shell for the app pages (sidebar/nav structure distinct from marketing).
2.  **Build Dashboard**: Implement the transaction list view.
3.  **Build Creation Flow**: Implement the transaction form.
4.  **Build Dispute/Vote View**: Implement the evidence and voting UI.
5.  **Refactor Header**: Integrate "Launch App" / Wallet connection.
