import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso da plataforma JuriLead.",
};

export default function TermosPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold">Termos de Uso</h1>
        <p className="mt-2 text-sm text-muted-foreground">Última atualização: Janeiro de 2025</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-2">
          <div>
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar a plataforma JuriLead (&ldquo;Plataforma&rdquo;), você declara ter lido,
              compreendido e aceito integralmente estes Termos de Uso. Se não concordar, interrompa
              imediatamente o uso.
            </p>
          </div>

          <div>
            <h2>2. Objeto</h2>
            <p>
              A Plataforma tem por finalidade conectar pessoas que buscam orientação ou serviço jurídico
              (&ldquo;Clientes&rdquo;) a advogados regularmente inscritos na OAB (&ldquo;Advogados Parceiros&rdquo;).
              A JuriLead não é escritório de advocacia, não presta assessoria jurídica nem atua como
              intermediária em litígios.
            </p>
          </div>

          <div>
            <h2>3. Cadastro e Responsabilidades</h2>
            <p>
              <strong>Clientes:</strong> Ao enviar um formulário, o usuário fornece dados pessoais e descrição
              de sua demanda. Os dados serão tratados conforme a Política de Privacidade.
            </p>
            <p className="mt-2">
              <strong>Advogados Parceiros:</strong> Devem possuir registro ativo na OAB, fornecer dados
              verdadeiros e cumprir o Código de Ética e Disciplina da OAB. A JuriLead se reserva ao direito
              de recusar ou cancelar cadastros que violem estes termos.
            </p>
          </div>

          <div>
            <h2>4. Pacotes e Créditos</h2>
            <p>
              Os Advogados Parceiros podem adquirir pacotes de créditos para acessar leads qualificados.
              Cada lead adquirido consome crédito(s) conforme tabela vigente. Os valores são os informados
              na tela de compra no momento da transação. A aquisição é definitiva, salvo disposição em
              contrário na legislação aplicável.
            </p>
          </div>

          <div>
            <h2>5. Qualidade dos Leads</h2>
            <p>
              A JuriLead realiza triagem interna dos leads, porém não garante a contratação de serviços
              jurídicos pelo Cliente. Leads com dados visivelmente falsos ou duplicados podem ser
              reportados para análise.
            </p>
          </div>

          <div>
            <h2>6. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo da Plataforma (textos, layout, logomarcas, código-fonte) é de propriedade
              da JuriLead ou de seus licenciantes, protegido pela legislação de propriedade intelectual.
            </p>
          </div>

          <div>
            <h2>7. Limitação de Responsabilidade</h2>
            <p>
              A JuriLead não se responsabiliza por: (i) conduta de Advogados Parceiros ou Clientes;
              (ii) qualidade dos serviços jurídicos prestados; (iii) indisponibilidades momentâneas da
              Plataforma; (iv) danos indiretos ou lucros cessantes.
            </p>
          </div>

          <div>
            <h2>8. Proibições</h2>
            <p>
              É vedado: (a) utilizar a Plataforma para fins ilícitos; (b) revender ou compartilhar dados
              de leads com terceiros não autorizados; (c) captar leads fora da Plataforma utilizando
              dados obtidos nela; (d) realizar engenharia reversa ou acesso não autorizado.
            </p>
          </div>

          <div>
            <h2>9. Rescisão</h2>
            <p>
              A JuriLead pode suspender ou encerrar o acesso de qualquer usuário que viole estes Termos,
              sem aviso prévio e sem prejuízo de medidas judiciais cabíveis.
            </p>
          </div>

          <div>
            <h2>10. Alterações</h2>
            <p>
              Estes termos podem ser atualizados a qualquer momento. Alterações relevantes serão
              comunicadas por e-mail ou aviso na Plataforma. O uso continuado após a notificação constitui
              aceitação.
            </p>
          </div>

          <div>
            <h2>11. Foro</h2>
            <p>
              Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer controvérsias,
              com renúncia expressa a qualquer outro, por mais privilegiado que seja.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
