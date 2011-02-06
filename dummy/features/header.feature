Feature: Pugita Header
  In order to share headers among apps
  As a developer
  I want to be able to install the pugita_header
  
  Scenario: Loading the header
    When I am on the homepage
    Then I should see "866-518-YARD"
      And I should see "Hello"
      And I should see "All rights reserved"
      And the html should contain "I'm extra in the header"
      And the html should contain "I'm extra in the footer"