export default function AdminCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl mb-4 font-semibold">{title}</h2>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
