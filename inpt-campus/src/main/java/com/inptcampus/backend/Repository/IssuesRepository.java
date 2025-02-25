package com.inptcampus.backend.Repository;




import com.inptcampus.backend.Model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssuesRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByResolvedFalse();
    List<Issue> findByRoomId(String roomId);
}
