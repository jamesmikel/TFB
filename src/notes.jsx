const faqs = [
  {
    id: 1,
    question: "Where is the company located?",
    answer:
      "Our official office address is 1 Holbein Place, London, England, SW1W 8NS. You are welcome to visit during business hours.",
  },
  {
    id: 2,
    question: "Do you charge any withdrawal fees?",
    answer: "No. Currently, all withdrawals have a 0% fee.",
  },
  {
    id: 3,
    question: "What cryptocurrencies are accepted for deposits?",
    answer: "We currently accept BTC, TRON, USDT, BNB, and ETH.",
  },
  {
    id: 4,
    question:
      "I made a Bitcoin withdrawal and it was processed instantly, but the transaction hash does not yet exist on the blockchain. Why?",
    answer:
      "This is a temporary blockchain delay that happens occasionally. Please wait a few hours and the transaction should appear in your wallet.",
  },
  {
    id: 5,
    question:
      "My withdrawal was processed instantly, but it has not appeared in my wallet. Why?",
    answer: (
      <>
        Withdrawals require at least <strong>3 blockchain confirmations</strong>{" "}
        before they are credited to your wallet. Confirmation speeds depend on
        the Bitcoin network.
        <br />
        Useful links:{" "}
        <a
          href="https://www.blockchain.com/btc/tx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#02030b" }}
        >
          Check Transactions
        </a>{" "}
        |{" "}
        <a
          href="https://www.blockchain.com/btc/unconfirmed-transactions"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#02030b" }}
        >
          Unconfirmed Transactions
        </a>
      </>
    ),
  },
  {
    id: 6,
    question: "My withdrawal was not processed instantly. Why?",
    answer:
      "This may occur if you have not added your Bitcoin wallet address. Please go to 'Edit Account' in your dashboard and provide the correct withdrawal address.",
  },
  {
    id: 7,
    question:
      "I made a deposit, but it has not been credited to my account. Why?",
    answer: (
      <>
        Deposits require at least <strong>3 blockchain confirmations</strong>{" "}
        before appearing in your account. Confirmation time depends on the
        Bitcoin network. You may check your transaction status at: <br />{" "}
        <a
          href="https://www.blockchain.com/btc/tx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#02030b" }}
        >
          Check Transactions
        </a>
      </>
    ),
  },
  {
    id: 8,
    question:
      "What is the maximum deposit amount allowed on Trusted-finance.biz?",
    answer: "The maximum deposit amount allowed is $300,000.",
  },
  {
    id: 9,
    question: "What investment plans are offered?",
    answer:
      "Trusted-finance.biz offers 6 investment plans, including a 20% return in 1 hour, which provides the highest yield.",
  },
  {
    id: 10,
    question:
      "What is Trusted-finance.biz and what are the company’s activities?",
    answer:
      "Trusted-finance.biz is an international financial services provider specializing in cryptocurrency trading, mining, and hardware development, offering secure investment solutions.",
  },
  {
    id: 11,
    question: "Is Trusted-finance.biz a registered and legal company?",
    answer:
      "Yes. Trusted-finance.biz is officially registered in the United Kingdom as 'Trusted Finance.biz Limited' with registration number #12201592.",
  },
  {
    id: 12,
    question: "Who can become a customer?",
    answer:
      "Any individual may become an investor, regardless of technical knowledge or prior experience with cryptocurrency.",
  },
  {
    id: 13,
    question: "How can I make a deposit?",
    answer:
      "Register an account, log in, select 'Deposit', select a plan, enter the amount, and confirm. A wallet address will be generated for your payment.",
  },
  {
    id: 14,
    question: "When will my deposit become active?",
    answer:
      "Deposits become active once the blockchain confirms the transaction, usually after 3 confirmations.",
  },
  {
    id: 15,
    question: "Can I open multiple accounts?",
    answer:
      "No. Multiple accounts are strictly prohibited and will result in suspension.",
  },
  {
    id: 16,
    question: "Can I reinvest my earnings?",
    answer:
      "Yes, you may reinvest earnings by creating a new deposit through your account dashboard.",
  },
  {
    id: 17,
    question: "Is my personal data secure?",
    answer:
      "Yes. All data is protected by advanced SSL encryption and strict privacy practices.",
  },
  {
    id: 18,
    question: "What if I forget my password?",
    answer:
      "Use the 'Forgot Password' link on the login page, enter your registered email, and follow the password reset instructions.",
  },
  {
    id: 19,
    question: "Do you offer customer support?",
    answer:
      "Yes. We provide 24/7 customer support via email and website live chat.",
  },
  {
    id: 20,
    question: "Can I cancel a withdrawal request?",
    answer:
      "No. Once processed, blockchain transactions cannot be reversed or canceled.",
  },
  {
    id: 22,
    question: "Is your business designed for long-term operation?",
    answer:
      "Yes. Our development plan spans at least the next 10 years, ensuring long-term operations and stability.",
  },
  {
    id: 23,
    question: "Is there a risk of losing money?",
    answer:
      "Crypto and forex markets are inherently volatile. However, we aim to minimize risk through responsible trading strategies.",
  },
  {
    id: 24,
    question: "How do I open my Trusted-finance.biz account?",
    answer:
      'Visit our website, click "Register", fill out the form, and submit.',
  },
  {
    id: 25,
    question: "How can I make a deposit?",
    answer:
      'Go to the "Deposits" section, select a plan, enter the amount, select your payment source, and click "Proceed".',
  },
  {
    id: 26,
    question: "What payment methods are supported for deposits and earnings?",
    answer: "We accept Bitcoin, ETH, USDT TRC20, TRON, and BNB.",
  },
  {
    id: 27,
    question:
      "I want to invest but I do not have a cryptocurrency wallet. What should I do?",
    answer:
      "You may create a Bitcoin wallet using services such as Blockchain.info, Coinbase.com, or Block.io.",
  },
  {
    id: 28,
    question: "What is a Bitcoin address?",
    answer:
      "A Bitcoin address is your unique wallet identifier. It begins with 1 or 3 and contains 27–34 alphanumeric characters.",
  },
  {
    id: 29,
    question: "How can I check the current Bitcoin exchange rate?",
    answer:
      "You can check real-time Bitcoin prices using services such as http://preev.com.",
  },
  {
    id: 30,
    question: "Where can I buy Bitcoin?",
    answer:
      "You may purchase Bitcoin from sellers listed on BuyBitcoinWorldwide.com.",
  },
  {
    id: 31,
    question: "How much can I invest?",
    answer:
      "Each deposit can range from $30 to $300,000, and you may hold up to 10 active deposits.",
  },
  {
    id: 32,
    question:
      "I entered the wrong email during registration. How can I fix it?",
    answer:
      "Emails and usernames cannot be changed. You must register a new account.",
  },
  {
    id: 33,
    question: "How fast will my deposit be credited?",
    answer:
      "Deposits are credited after 3 blockchain confirmations, typically within 1–24 hours.",
  },
  {
    id: 34,
    question:
      "What should I do if my active deposit is 0 after 6 confirmations?",
    answer:
      "Contact support and provide: (1) your username, (2) the exact deposit amount, and (3) the wallet address used.",
  },
  {
    id: 35,
    question: "How many deposits can I have?",
    answer:
      "You may have up to 10 deposits simultaneously, each with its own terms and profit schedule.",
  },
  {
    id: 36,
    question: "When will my first profit be generated?",
    answer:
      "Profits are generated daily. The first accrual occurs 24 hours after deposit activation.",
  },
  {
    id: 37,
    question: "Do I receive profit every day?",
    answer: "Yes. Profits are generated 7 days a week, including weekends.",
  },
  {
    id: 38,
    question: "Are payments made on weekends?",
    answer: "Yes, payments are processed on Saturdays and Sundays.",
  },
  {
    id: 39,
    question: "Is automatic reinvestment available?",
    answer:
      "No. Compounding is not automatic; reinvestment must be done manually.",
  },
  {
    id: 40,
    question: "Can I create a deposit using my account balance?",
    answer: "No. Funds must be withdrawn first before creating a new deposit.",
  },
  {
    id: 41,
    question: "How can I withdraw funds?",
    answer:
      'Log in to your account, go to "Withdraw Funds", and follow the instructions.',
  },
  {
    id: 42,
    question: "What is the minimum withdrawal amount?",
    answer: "The minimum withdrawal amount is $20.",
  },
  {
    id: 43,
    question: "When will my withdrawal appear in my wallet?",
    answer:
      "Withdrawals are processed automatically and appear immediately after your request is submitted.",
  },
  {
    id: 44,
    question: "What is the referral commission?",
    answer:
      "We offer a 2-level referral program: 5% on direct referrals and 1% on second-level referrals.",
  },
  {
    id: 45,
    question: "Do I need my own deposit to earn referral commissions?",
    answer: "Yes, an active deposit is required.",
  },
  {
    id: 46,
    question: "I cannot access my account. What should I do?",
    answer:
      "Verify that your login details are correct. If the issue persists, use the password reset feature.",
  },
  {
    id: 47,
    question: "How can I change my password?",
    answer: "You may change your password in your personal profile section.",
  },
  {
    id: 48,
    question: "I am not receiving emails from the company. Why?",
    answer:
      "Please check your spam folder. If the issue continues, contact your email provider.",
  },
  {
    id: 49,
    question: "How can I check my account balance?",
    answer: "You can access your account information 24/7 from your dashboard.",
  },
  {
    id: 50,
    question: "May I create multiple accounts?",
    answer: "No. Only one account is allowed per person.",
  },
  {
    id: 51,
    question: "Can my relatives register from my IP address?",
    answer: "Yes, this is allowed.",
  },
  {
    id: 52,
    question: "My withdrawal request is pending. What should I do?",
    answer:
      "Please verify that the withdrawal address in your account is valid and correctly saved.",
  },
  {
    id: 53,
    question: "My withdrawal request is pending. What should I check?",
    answer:
      'Ensure your payment address in the "Edit Account" section is valid and correctly entered.',
  },
  {
    id: 55,
    question: "How can I contact support?",
    answer:
      "You may contact us anytime through the support form or via support@trusted-finance.biz.",
  },
  {
    id: 56,
    question: "How do I earn referral commissions?",
    answer:
      "Simply register an account and share your referral link with others.",
  },
  {
    id: 57,
    question: "Please Note...",
    answer: "All withdrawals require the user to cover the associated gas fee.",
  },
];

export default faqs;
