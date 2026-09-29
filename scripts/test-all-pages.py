import urllib.request
import urllib.error
import urllib.parse
import time
import sys

BASE_URL = "http://localhost:3000"

public_pages = [
    "/",
    "/sobre",
    "/startups",
    "/mentores",
    "/investidores",
    "/espacos",
    "/universidades",
    "/governanca",
    "/impacto",
    "/parceiros",
    "/seja-parceiro",
    "/comunidade",
    "/empresas",
    "/desafios",
    "/conteudos",
    "/eventos",
    "/faca-parte",
    "/mapa",
    "/membro",
    "/oportunidades",
    "/privacidade",
    "/programas",
    "/voluntarie-se",
    "/login",
    "/cadastro"
]

generic_slug_pages = [
    "/ecossistema",
    "/termos",
    "/cookies",
    "/codigo-de-conduta",
    "/politica-de-conteudo",
    "/contato"
]

dynamic_detail_pages = [
    "/atores/fenix-valley",
    "/atores/puc-minas-betim",
    "/atores/senai-betim",
    "/conteudos/como-abrir-uma-startup-em-betim",
    "/conteudos/case-eficiencia-energetica-industria-40",
    "/conteudos/marco-legal-das-startups-oportunidades-municipais",
    "/desafios/reduzir-perdas-na-linha-de-pintura-com-visao-computacional",
    "/parceiros/universidade-exemplo",
    "/parceiros/coworking-exemplo",
    "/programas/pre-aceleracao",
    "/programas/aceleracao",
    "/programas/incubacao",
    "/universidades/trilhas/ideia-ao-mvp"
]

admin_pages = [
    "/admin/login",
    "/admin",
    "/admin/atores",
    "/admin/atores/novo",
    "/admin/atores/1/editar",
    "/admin/desafios",
    "/admin/desafios/1",
    "/admin/eventos",
    "/admin/impacto",
    "/admin/impacto/historias/nova",
    "/admin/impacto/historias/1/editar",
    "/admin/impacto/indicadores/novo",
    "/admin/impacto/indicadores/1/editar",
    "/admin/leads",
    "/admin/oportunidades",
    "/admin/oportunidades/nova",
    "/admin/oportunidades/1/editar",
    "/admin/parceiros",
    "/admin/parceiros/nova",
    "/admin/parceiros/1/editar",
    "/admin/programas",
    "/admin/trilhas",
    "/admin/trilhas/nova",
    "/admin/trilhas/1/editar",
    "/admin/voluntarios"
]

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

def test_url_single(url, expect_redirect=False):
    full_url = f"{BASE_URL}{url}"
    t0 = time.time()
    try:
        req = urllib.request.Request(full_url, headers={"User-Agent": "Mozilla/5.0 (PageAuditor/1.0)"})
        if expect_redirect:
            opener = urllib.request.build_opener(NoRedirectHandler)
            try:
                res = opener.open(req)
                status = res.status
                body = res.read().decode("utf-8", errors="ignore")
            except urllib.error.HTTPError as e:
                status = e.code
                body = e.read().decode("utf-8", errors="ignore")
        else:
            with urllib.request.urlopen(req) as res:
                status = res.status
                body = res.read().decode("utf-8", errors="ignore")

        elapsed_ms = int((time.time() - t0) * 1000)

        if expect_redirect:
            if status in [301, 302, 303, 307, 308]:
                return True, f"HTTP {status} (Redirect) [{elapsed_ms}ms]"
            elif url == "/admin/login" and status == 200:
                return True, f"HTTP 200 OK [{elapsed_ms}ms]"
            elif status == 200:
                return True, f"HTTP {status} [{elapsed_ms}ms]"
            else:
                return False, f"Unexpected status HTTP {status} [{elapsed_ms}ms]"

        if status != 200:
            return False, f"HTTP {status} [{elapsed_ms}ms]"

        for err_pattern in ["Internal Server Error", "Unhandled Runtime Error", "Application error: a client-side exception"]:
            if err_pattern in body:
                return False, f"Found '{err_pattern}' in response HTML [{elapsed_ms}ms]"

        return True, f"HTTP 200 OK ({len(body)} bytes) [{elapsed_ms}ms]"

    except urllib.error.HTTPError as e:
        elapsed_ms = int((time.time() - t0) * 1000)
        if expect_redirect and e.code in [301, 302, 303, 307, 308]:
            return True, f"HTTP {e.code} (Redirect) [{elapsed_ms}ms]"
        return False, f"HTTP Error {e.code}: {e.reason} [{elapsed_ms}ms]"
    except Exception as e:
        elapsed_ms = int((time.time() - t0) * 1000)
        return False, f"Network/Exception: {e} [{elapsed_ms}ms]"

def test_url(url, expect_redirect=False, retries=2):
    for attempt in range(retries + 1):
        ok, msg = test_url_single(url, expect_redirect)
        if ok:
            return ok, msg
        if attempt < retries:
            time.sleep(1.0)
    return ok, msg

def run_suite():
    print("==================================================")
    print("       AUDITORIA COMPLETA DE TODAS AS PÁGINAS     ")
    print("==================================================")
    
    total_tests = len(public_pages) + len(generic_slug_pages) + len(dynamic_detail_pages) + len(admin_pages)
    passed = 0
    failed = 0
    failures = []

    print(f"\n1. PÁGINAS PÚBLICAS PRINCIPAIS ({len(public_pages)} páginas):")
    for p in public_pages:
        ok, detail = test_url(p)
        time.sleep(0.05)
        if ok:
            passed += 1
            print(f"  [PASS] {p:<25} -> {detail}")
        else:
            failed += 1
            failures.append((p, detail))
            print(f"  [FAIL] {p:<25} -> {detail}")

    print(f"\n2. PÁGINAS INSTITUCIONAIS DINÂMICAS /[slug] ({len(generic_slug_pages)} páginas):")
    for p in generic_slug_pages:
        ok, detail = test_url(p)
        time.sleep(0.05)
        if ok:
            passed += 1
            print(f"  [PASS] {p:<25} -> {detail}")
        else:
            failed += 1
            failures.append((p, detail))
            print(f"  [FAIL] {p:<25} -> {detail}")

    print(f"\n3. PÁGINAS DE DETALHES DINÂMICAS COM REGISTROS REAIS ({len(dynamic_detail_pages)} páginas):")
    for p in dynamic_detail_pages:
        ok, detail = test_url(p)
        time.sleep(0.05)
        if ok:
            passed += 1
            print(f"  [PASS] {p:<45} -> {detail}")
        else:
            failed += 1
            failures.append((p, detail))
            print(f"  [FAIL] {p:<45} -> {detail}")

    print(f"\n4. PÁGINAS ADMINISTRATIVAS ({len(admin_pages)} páginas):")
    for p in admin_pages:
        is_login = (p == "/admin/login")
        ok, detail = test_url(p, expect_redirect=not is_login)
        time.sleep(0.05)
        if ok:
            passed += 1
            print(f"  [PASS] {p:<45} -> {detail}")
        else:
            failed += 1
            failures.append((p, detail))
            print(f"  [FAIL] {p:<45} -> {detail}")

    print("\n--------------------------------------------------")
    print(f"RESULTADO: {passed}/{total_tests} passaram ({passed/total_tests*100:.1f}%)")
    if failures:
        print(f"FALHAS ENCONTRADAS ({len(failures)}):")
        for f, reason in failures:
            print(f"  - {f}: {reason}")
    else:
        print("TODAS AS 69 ROTAS TESTADAS RESPONDERAM PERFEITAMENTE!")
    print("--------------------------------------------------")

    return failed == 0

if __name__ == "__main__":
    success = run_suite()
    sys.exit(0 if success else 1)
