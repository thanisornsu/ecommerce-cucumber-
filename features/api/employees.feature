Feature: Employees API

  @api
  Scenario: Create a new employee (Positive)
    Given I have employee data
      | firstName | John |
      | lastName  | Doe  |
      | email     | john.doe@example.com |
    When I send a POST request to "/api/v1/employees"
    Then the response status code should be 201
    And the response should contain the created employee ID

  @api
  Scenario: Create employee with invalid email (Negative)
    Given I have employee data
      | firstName | Jane |
      | lastName  | Doe  |
      | email     | invalid-email |
    When I send a POST request to "/api/v1/employees"
    Then the response status code should be 400
    And the response body should contain "defaultMessage"

  @api
  Scenario: Get existing employee (Positive)
    Given an employee with ID 1 exists
    When I send a GET request to "/api/v1/employees/1"
    Then the response status code should be 200
    And the response should contain employee details

  @api
  Scenario: Get non-existing employee (Negative)
    Given no employee exists with ID 99999
    When I send a GET request to "/api/v1/employees/99999"
    Then the response status code should be 404
    And the response body should contain "Employee not found with ID 99999"
