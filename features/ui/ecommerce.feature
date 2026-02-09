Feature: E-commerce Functionality

  Background:
    Given I am on the login page

  @ui @login
  Scenario Outline: Step 1 - Login
    When I login with "<email>" and "<password>"
    Then I should see the "<result_message>" or be redirected

    Examples:
      | email             | password | result_message |
      | admin@admin.com   | admin123 | Shop           |
      | invalid@test.com  | wrong    | Bad credentials |

  @ui @shop
  Scenario: Step 2 - Add items and validate total
    Given I am logged in as "admin@admin.com" with password "admin123"
    When I add "Apple iPhone 13, 128GB, Blue" 2 times
    And I add "Huawei Mate 20 Lite, 64GB, Black" 3 times
    Then the total cost should be correct based on item prices

  @ui @checkout
  Scenario Outline: Step 3 - Checkout Process
    Given I am logged in as "admin@admin.com" with password "admin123"
    And I have items in my cart
    And I proceed to checkout
    When I fill the checkout form with:
      | Phone     | <phone>     |
      | Street    | <street>    |
      | City      | <city>      |
      | Country   | <country>   |
    And I click submit order
    Then I should see a success message "<success>"
    
    Examples:
      | phone       | street | city      | country      | success          |
      | 0123456789  | BangNa | Bangkok   | Thailand     | Congrats         |
      |             | BangNa | Bangkok   | Thailand     | validation_error |
      | 0123456789  |        | Bangkok   | Thailand     | validation_error |

  @ui @address_format
  Scenario: Step 4 - Validate Address Format
    Given I am logged in as "admin@admin.com" with password "admin123"
    And I have items in my cart
    And I proceed to checkout
    When I fill the checkout form with:
      | Phone     | 0123456789 |
      | Street    | BangNa     |
      | City      | Bangkok    |
      | Country   | Thailand   |
    And I click submit order
    Then the address should be displayed in format "BangNa, Bangkok - Thailand"
