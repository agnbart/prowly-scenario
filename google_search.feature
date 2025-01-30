Feature: Search for "prowly" on Google with date filter

  Scenario: Search for "prowly" with results from the past 24 hours
    Given I open Google search page
    When I search for "prowly"
    And I apply the date filter for "Past 24 hours"
    Then I should see search results related to "prowly" from the last 24 hours

  Scenario: Search for "prowly" with results from the past week
    Given I open Google search page
    When I search for "prowly"
    And I apply the date filter for "Past week"
    Then I should see search results related to "prowly" from the last 7 days

  Scenario: Search for "prowly" with results from the past month
    Given I open Google search page
    When I search for "prowly"
    And I apply the date filter for "Past month"
    Then I should see search results related to "prowly" from the last month