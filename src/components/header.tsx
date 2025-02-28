import { Button, NavDropdown, Stack, Navbar, Nav, Container } from "react-bootstrap";
import { checkIsOnlineUser, logOutUser } from "./api";
import { useQuery } from "@tanstack/react-query";

export const Header = () => {
  const { data: isLogin, isLoading } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: checkIsOnlineUser,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

  const navigate = (link: string) => {
    window.location.href = `https://${link}.informatiquesenwolof.com`;
  };
  const authNavigate = (link: string) => {
    window.location.href = `https://auth.informatiquesenwolof.com/${link}`;
  };

  const handleLogout = async () => {
    const isLoggedOut = await logOutUser();
    if (isLoggedOut) {
      alert("Déconnexion réussie");
      window.location.reload();
    }
  };

  return (
    <>
      <Stack direction="horizontal" gap={3} className="width">
        <div className="p-2" id="title">
          <Navbar.Brand>
            <h1 onClick={() => navigate("home")} style={{ cursor: "pointer" }}>
              Informatiques<span className="span"> en wolof</span>
            </h1>
          </Navbar.Brand>
        </div>
        <div className="p-2 ms-auto">
          <Button className="mail-btn" variant="primary" onClick={() => window.location.href = "mailto:admin@sen-teranga.com"}>
            <img src="../images/icons/email.png" alt="secured-letter" />
          </Button>
        </div>
        <div className="p-2">
          <Button variant="primary" className="btn-wth" onClick={() => window.location.href = "https://wa.me/221704291214"}>
            <img src="../images/icons/whatsapp.png" alt="whatsapp" />
          </Button>
        </div>
      </Stack>

      <Navbar expand="lg" className="navbar full-width-navbar" variant="light" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand className="link">Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-collapse-id" />
          <Navbar.Collapse id="navbar-collapse-id">
            <Nav activeKey="/link" className="me-auto">
              <Nav.Link className="link" onClick={() => navigate("home")}>Accueil</Nav.Link>
              <NavDropdown title="Formations" id="nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("free-course")}>Parcourir les cours gratuits</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("course")}>Parcourir les cours avancés</NavDropdown.Item>
                {isLogin && <NavDropdown.Item onClick={() => navigate("course")}>Voir mes formations achetées</NavDropdown.Item>}
              </NavDropdown>

              <NavDropdown title="Mon compte" id="nav-dropdown">
                {isLogin && <NavDropdown.Item onClick={() => navigate("my-account")}>Mon compte</NavDropdown.Item>}
                <NavDropdown.Item onClick={() => isLogin ? handleLogout() : authNavigate("login")}>
                  {isLogin ? "Déconnexion" : "Connexion"}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => authNavigate("")}>
                  {isLogin ? "Créer un nouveau compte" : "Créer un compte"}
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Soutenir la plateforme" id="nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("checkout")}>Faire un abonnement</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("checkout")}>Faire un don</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link className="link" onClick={() => navigate("statics")}>À propos</Nav.Link>
              <Nav.Link className="link" onClick={() => window.location.href = "https://statics.informatiquesenwolof.com/contact"}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
