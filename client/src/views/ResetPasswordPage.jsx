export default function ResetPasswordPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="bg-white p-8 rounded-2xl">
          <h1 className="text-2xl font-bold font-[open-sans] text-black mb-6">
            Reset your password here
          </h1>
          <div className="flex flex-col gap-4">
            <input
              className="rounded-2xl bg-slate-100 p-4 text-black"
              type="password"
              placeholder="New password"
            />
            <input
              className="rounded-2xl bg-slate-100 p-4 text-black"
              type="password"
              placeholder="Re-enter new password"
            />
          </div>
        </div>
      </div>
    </>
  );
}
