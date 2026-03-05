import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Saiba como a Conect Juris coleta, utiliza e protege seus dados pessoais, em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-muted-foreground">Última atualização: Janeiro de 2025</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          <div>
            <h2>1. Introdução</h2>
            <p>
              A Conect Juris (&ldquo;nós&rdquo;) respeita a privacidade dos seus usuários e está comprometida com
              a proteção de dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei
              nº 13.709/2018 — LGPD). Esta Política descreve como coletamos, utilizamos, armazenamos e
              compartilhamos seus dados.
            </p>
          </div>

          <div>
            <h2>2. Dados Coletados</h2>
            <p>Coletamos as seguintes categorias de dados:</p>
            <ul className="mt-2">
              <li><strong>Clientes:</strong> nome, e-mail, WhatsApp (telefone), cidade, UF, área do direito,
                nível de urgência, descrição do caso, documentos (quando fornecidos), consentimentos.</li>
              <li><strong>Advogados Parceiros:</strong> nome, e-mail, telefone, número OAB, UF da OAB,
                áreas de atuação, estado, cidade, dados bancários/de pagamento, CPF/CNPJ.</li>
              <li><strong>Navegação:</strong> endereço IP, tipo de navegador, páginas visitadas, parâmetros UTM,
                cookies de sessão e analytics (Google Analytics 4).</li>
            </ul>
          </div>

          <div>
            <h2>3. Base Legal e Finalidades</h2>
            <p>Tratamos seus dados com as seguintes bases legais (art. 7º, LGPD):</p>
            <ul className="mt-2">
              <li><strong>Consentimento:</strong> envio de formulário de lead, aceite do termos e da política.</li>
              <li><strong>Execução de contrato:</strong> prestação do serviço de distribuição de leads entre
                advogados parceiros.</li>
              <li><strong>Legítimo interesse:</strong> melhoria da plataforma, analytics, prevenção a fraudes.</li>
              <li><strong>Obrigação legal:</strong> cumprimento de obrigações fiscais e regulatórias.</li>
            </ul>
          </div>

          <div>
            <h2>4. Compartilhamento de Dados</h2>
            <p>Seus dados podem ser compartilhados com:</p>
            <ul className="mt-2">
              <li><strong>Advogados Parceiros:</strong> dados do lead são disponibilizados ao advogado que
                adquire o crédito correspondente. Os dados são mascarados até a aquisição.</li>
              <li><strong>Pagamentos:</strong> as compras de créditos são realizadas por atendimento offline via WhatsApp e registradas internamente no sistema.</li>
              <li><strong>Analytics:</strong> Google Analytics 4, para análise de tráfego (dados anonimizados).</li>
              <li><strong>Autoridades:</strong> quando exigido por lei ou ordem judicial.</li>
            </ul>
          </div>

          <div>
            <h2>5. Armazenamento e Segurança</h2>
            <p>
              Os dados são armazenados em servidores seguros, com criptografia em trânsito (TLS/SSL) e
              em repouso. Adotamos medidas técnicas e organizacionais para proteger seus dados contra
              acesso não autorizado, destruição, perda ou alteração. O acesso aos dados é restrito
              a colaboradores autorizados.
            </p>
          </div>

          <div>
            <h2>6. Retenção de Dados</h2>
            <p>
              Os dados pessoais são mantidos pelo tempo necessário para cumprir as finalidades para as quais
              foram coletados, respeitando prazos legais. Leads não adquiridos podem ter dados anonimizados
              após 12 meses de inatividade. Dados de advogados parceiros são mantidos enquanto a conta
              estiver ativa.
            </p>
          </div>

          <div>
            <h2>7. Direitos do Titular</h2>
            <p>Conforme a LGPD, você tem direito a:</p>
            <ul className="mt-2">
              <li>Confirmação da existência de tratamento de dados</li>
              <li>Acesso aos dados pessoais</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Portabilidade dos dados</li>
              <li>Eliminação de dados tratados com base em consentimento</li>
              <li>Informação sobre compartilhamento</li>
              <li>Revogação do consentimento</li>
            </ul>
            <p className="mt-2">
              Para exercer seus direitos, entre em contato pelo e-mail{" "}
              <strong>privacidade@Conect Juris.com.br</strong>.
            </p>
          </div>

          <div>
            <h2>8. Cookies</h2>
            <p>
              Utilizamos cookies estritamente necessários para o funcionamento da plataforma e cookies
              de analytics (Google Analytics) para compreender padrões de uso. Você pode desabilitar
              cookies nas configurações do seu navegador, porém isso pode afetar funcionalidades.
            </p>
          </div>

          <div>
            <h2>9. Bloqueio de Leads</h2>
            <p>
              Leads que solicitarem a não venda de seus dados poderão ter o status alterado para
              &ldquo;bloqueado&rdquo;, impedindo a distribuição a advogados parceiros. O bloqueio é
              definitivo e pode ser solicitado a qualquer momento.
            </p>
          </div>

          <div>
            <h2>10. Alterações</h2>
            <p>
              Esta Política pode ser atualizada periodicamente. Recomendamos revisá-la regularmente.
              Alterações significativas serão comunicadas por e-mail ou aviso no site.
            </p>
          </div>

          <div>
            <h2>11. Contato — Encarregado de Dados (DPO)</h2>
            <p>
              Para dúvidas, reclamações ou exercício de direitos relacionados à proteção de dados, entre em
              contato com nosso Encarregado de Proteção de Dados:
            </p>
            <p className="mt-2">
              <strong>E-mail:</strong> privacidade@Conect Juris.com.br
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

