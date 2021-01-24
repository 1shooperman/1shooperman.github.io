import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithubSquare,
  faGoodreads,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons"

export default () => (
  <div class="row">
    <IconColumn icon={faLinkedin} link="https://www.linkedin.com/in/brandonshoop/" />
    <IconColumn icon={faGithubSquare} link="https://github.com/1shooperman" />
    <IconColumn icon={faGoodreads} link="https://www.goodreads.com/user/show/59372161-brandon" />
  </div>
)

const IconColumn = ({ icon, link }) => (
  <div class="col">
    <a href={link} rel="nofollow,noreferrer" target="_blank" style={IconStyles}>
      <FontAwesomeIcon icon={icon} size="3x" />
    </a>
  </div>
)

const IconStyles = {
  color: "rgb(101, 147, 193)"
}
