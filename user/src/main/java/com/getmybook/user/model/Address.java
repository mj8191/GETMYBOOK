package com.getmybook.user.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Address
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2024-06-26T10:10:41.543404103Z[GMT]")

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Address   {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    @Column(name = "id")
    private Integer id = null;

    @JsonProperty("addressType")
    private String addressType = null;

    @JsonProperty("userName")
    private String userName = null;

    @JsonProperty("pin")
    private Integer pin = null;

    @JsonProperty("line1")
    private String line1 = null;

    @JsonProperty("line2")
    private String line2 = null;

    @JsonProperty("dist")
    private String dist = null;

    @JsonProperty("state")
    private String state = null;

    @JsonProperty("createdOn")
    private String createdOn = null;

    @JsonProperty("updatedOn")
    private String updatedOn = null;

    @JsonProperty("createdBy")
    private String createdBy = null;

    @JsonProperty("updatedBy")
    private String updatedBy = null;

    public Address id(Integer id) {
        this.id = id;
        return this;
    }

    /**
     * Get id
     * @return id
     **/
    @Schema(required = true, description = "")
    @NotNull

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Address addressType(String addressType) {
        this.addressType = addressType;
        return this;
    }

    /**
     * Get addressType
     * @return addressType
     **/
    @Schema(required = true, description = "")
    @NotNull

    public String getAddressType() {
        return addressType;
    }

    public void setAddressType(String addressType) {
        this.addressType = addressType;
    }

    public Address userName(String userName) {
        this.userName = userName;
        return this;
    }

    /**
     * Get userName
     * @return userName
     **/
    @Schema(required = true, description = "")
    @NotNull

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Address pin(Integer pin) {
        this.pin = pin;
        return this;
    }

    /**
     * Get pin
     * @return pin
     **/
    @Schema(required = true, description = "")
    @NotNull

    public Integer getPin() {
        return pin;
    }

    public void setPin(Integer pin) {
        this.pin = pin;
    }

    public Address line1(String line1) {
        this.line1 = line1;
        return this;
    }

    /**
     * Get line1
     * @return line1
     **/
    @Schema(required = true, description = "")
    @NotNull

    public String getLine1() {
        return line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    public Address line2(String line2) {
        this.line2 = line2;
        return this;
    }

    /**
     * Get line2
     * @return line2
     **/
    @Schema(required = true, description = "")
    @NotNull

    public String getLine2() {
        return line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public Address dist(String dist) {
        this.dist = dist;
        return this;
    }

    /**
     * Get dist
     * @return dist
     **/
    @Schema(required = true, description = "")
    @NotNull

    public String getDist() {
        return dist;
    }

    public void setDist(String dist) {
        this.dist = dist;
    }

    public Address state(String state) {
        this.state = state;
        return this;
    }

    /**
     * Get state
     * @return state
     **/
    @Schema(required = true, description = "")
    @NotNull

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Address createdOn(String createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    /**
     * Get createdOn
     * @return createdOn
     **/
    @Schema(description = "")
    @NotNull

    public String getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(String createdOn) {
        this.createdOn = createdOn;
    }

    public Address updatedOn(String updatedOn) {
        this.updatedOn = updatedOn;
        return this;
    }

    /**
     * Get updatedOn
     * @return updatedOn
     **/
    @Schema(description = "")
    @NotNull

    public String getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(String updatedOn) {
        this.updatedOn = updatedOn;
    }

    public Address createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    /**
     * Get createdBy
     * @return createdBy
     **/
    @Schema(description = "")
    @NotNull

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Address updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    /**
     * Get updatedBy
     * @return updatedBy
     **/
    @Schema(description = "")
    @NotNull

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }


    @Override
    public boolean equals(java.lang.Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Address address = (Address) o;
        return Objects.equals(this.id, address.id) &&
                Objects.equals(this.addressType, address.addressType) &&
                Objects.equals(this.userName, address.userName) &&
                Objects.equals(this.pin, address.pin) &&
                Objects.equals(this.line1, address.line1) &&
                Objects.equals(this.line2, address.line2) &&
                Objects.equals(this.dist, address.dist) &&
                Objects.equals(this.state, address.state) &&
                Objects.equals(this.createdOn, address.createdOn) &&
                Objects.equals(this.updatedOn, address.updatedOn) &&
                Objects.equals(this.createdBy, address.createdBy) &&
                Objects.equals(this.updatedBy, address.updatedBy);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, addressType, userName, pin, line1, line2, dist, state, createdOn, updatedOn, createdBy, updatedBy);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class Address {\n");

        sb.append("    id: ").append(toIndentedString(id)).append("\n");
        sb.append("    addressType: ").append(toIndentedString(addressType)).append("\n");
        sb.append("    userName: ").append(toIndentedString(userName)).append("\n");
        sb.append("    pin: ").append(toIndentedString(pin)).append("\n");
        sb.append("    line1: ").append(toIndentedString(line1)).append("\n");
        sb.append("    line2: ").append(toIndentedString(line2)).append("\n");
        sb.append("    dist: ").append(toIndentedString(dist)).append("\n");
        sb.append("    state: ").append(toIndentedString(state)).append("\n");
        sb.append("    createdOn: ").append(toIndentedString(createdOn)).append("\n");
        sb.append("    updatedOn: ").append(toIndentedString(updatedOn)).append("\n");
        sb.append("    createdBy: ").append(toIndentedString(createdBy)).append("\n");
        sb.append("    updatedBy: ").append(toIndentedString(updatedBy)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(java.lang.Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}
