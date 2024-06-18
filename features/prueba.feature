Feature: Registro de usuarios en Sistema de Gestión de Biblioteca

  Scenario: Registro exitoso de un usuario
    Given que estoy en el formulario de registro
    And no tengo una cuenta
    When ingreso mis datos en los campos correspondientes como: correo electrónico, contraseña
    Then los datos se guardan en la base de datos del sistema
    And recibo un mensaje de confirmación de la cuenta creada correctamente

  Scenario: Registro de un correo ya registrado en una cuenta
    Given que estoy en el formulario de registro
    And no tengo una cuenta
    When ingreso mis datos en los campos correspondientes como: correo electrónico, contraseña
    Then los datos se guardan en la base de datos del sistema
    And recibo una alerta de error indicando que el correo electrónico ya fue registrado en otra cuenta, para poder registrarse ingrese otro correo

  Scenario: Registro de usuario con una contraseña muy corta
    Given que estoy en el formulario de registro
    And no tengo una cuenta
    When ingreso mis datos en los campos correspondientes como: correo electrónico, contraseña
    Then los datos se guardan en la base de datos del sistema
    And recibo una alerta de error indicando que la contraseña es muy corta, que ingrese más caracteres (8)

  Scenario: Registro de usuario con un correo no válido
    Given que estoy en el formulario de registro
    And no tengo una cuenta
    When ingreso mis datos en los campos correspondientes como: correo electrónico, contraseña
    Then los datos se guardan en la base de datos del sistema
    And recibo una alerta de error indicando que el correo es inválido para el registro
