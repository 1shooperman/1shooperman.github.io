import { getPolicyById, getPolicies } from "@/lib/getPolicies";

export async function generateStaticParams() {
  const policies = await getPolicies();
  return policies.map((policy) => ({ id: policy.id }));
}

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

export default async function PolicyPage({ params }: Props) {
  const resolvedParams = await params;
  const policy = await getPolicyById(resolvedParams.id);

  if (!policy) {
    return <div style={{ whiteSpace: 'pre' }}>Policy Not Found</div>;
  }

  return <div style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}>{policy.content}</div>;
} 