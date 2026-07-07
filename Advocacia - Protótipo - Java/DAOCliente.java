import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DAOCliente {
	public void salvarDadosCadastro(Cliente clienteTemp) throws SQLException, ClassNotFoundException {

		Class.forName("com.mysql.jdbc.Driver");

		String url = "jdbc:mysql://localhost:3306/advocacia";
		String username = "root";
		String password = "123";

		try (Connection connection = DriverManager.getConnection(url, username, password);
			 PreparedStatement statement = connection.prepareStatement(
					 "INSERT INTO cliente (nome, cpf, senha, telefone, email) VALUES (?, ?, ?, ?, ?)")) {

			statement.setString(1, clienteTemp.getUsuarioNome());
			statement.setString(2, clienteTemp.getUsuarioCpf());
			statement.setString(3, clienteTemp.getUsuarioSenha());
			statement.setString(4, clienteTemp.getUsuarioTelefone());
			statement.setString(5, clienteTemp.getUsuarioEmail());
			statement.executeUpdate();
		}
	}
}

