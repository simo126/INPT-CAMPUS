package com.inptcampus.backend.Repository;

import com.inptcampus.backend.Model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
}
