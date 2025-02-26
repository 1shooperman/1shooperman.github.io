import { getPolicyById, getPolicies } from "@/lib/getPolicies";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const policies = await getPolicies();
  return policies.map((policy) => ({ id: policy.id }));
}

export default async function PolicyPage({ params }: { params: Params }) {
  const { id } = await params;
  const policy = await getPolicyById(id);

  if (!policy) {
    return <div style={{ whiteSpace: 'pre' }}>Policy Not Found</div>;
  }

  return <div style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}>{policy.content}</div>;
} 