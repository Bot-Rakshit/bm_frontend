export function ChessVerificationStep() {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Verify Your Chess.com Account</h2>
        <p className="text-gray-400">
          To complete your signup, we need to verify your Chess.com account. Please follow these steps:
        </p>
        <ol className="list-decimal list-inside text-left space-y-2 text-gray-300">
          <li>Copy the verification code below</li>
          <li>Go to your Chess.com profile settings</li>
          <li>Paste the code in the "Location" field</li>
          <li>Save your changes</li>
          <li>Come back here and click "Verify"</li>
        </ol>
      </div>
    );
  }